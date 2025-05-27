// src/components/dashboard/FloatingBackground.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Sparkles,
  Heart,
  Star,
  Flower2,
  Gem,
  Crown,
  Zap,
  Palette,
  Wand2,
  Smile
} from 'lucide-react';

interface FloatingBackgroundProps {
  darkMode: boolean;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  icon: React.ElementType;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
}

const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ darkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ردیابی موقعیت ماوس
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // آیکون‌ها و رنگ‌های مختلف برای عناصر شناور
  const floatingIcons = [
    Sparkles, Heart, Star, Flower2, Gem, 
    Crown, Zap, Palette, Wand2, Smile
  ];

  const colors = [
    'text-purple-400/30',
    'text-pink-400/30',
    'text-blue-400/30',
    'text-green-400/30',
    'text-yellow-400/30',
    'text-indigo-400/30',
    'text-rose-400/30',
    'text-teal-400/30',
    'text-cyan-400/30',
    'text-orange-400/30'
  ];

  // ایجاد عناصر شناور با useMemo برای بهینه‌سازی
  const floatingElements = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20, // 15-35 seconds
      icon: floatingIcons[Math.floor(Math.random() * floatingIcons.length)],
      size: 16 + Math.random() * 24, // 16-40px
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      opacity: 0.1 + Math.random() * 0.3 // 0.1-0.4
    }));
  }, []);

  // عناصر gradient در پس‌زمینه
  const gradientBlobs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 200 + Math.random() * 400, // 200-600px
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15, // 20-35 seconds
      color: `hsl(${Math.random() * 360}, 70%, 85%)`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Blobs */}
      <div className="absolute inset-0">
        {gradientBlobs.map((blob) => (
          <div
            key={`blob-${blob.id}`}
            className={`absolute rounded-full blur-3xl ${
              darkMode ? 'opacity-5' : 'opacity-10'
            }`}
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
              animation: `floatBlob ${blob.duration}s ease-in-out infinite`,
              animationDelay: `${blob.delay}s`
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <div
              key={`icon-${element.id}`}
              className={`absolute ${element.color} ${
                darkMode ? 'opacity-20' : 'opacity-30'
              }`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                animation: `floatIcon ${element.duration}s ease-in-out infinite`,
                animationDelay: `${element.delay}s`
              }}
            >
              <IconComponent 
                className="w-full h-full drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 ${element.size / 4}px currentColor)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Mouse Interactive Particles */}
      <div
        className="absolute pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Particle Ring 1 */}
        <div className={`absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10' 
            : 'bg-gradient-to-r from-purple-300/20 to-pink-300/20'
        } rounded-full blur-xl animate-pulse`}></div>
        
        {/* Particle Ring 2 */}
        <div className={`absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-500/15 to-cyan-500/15' 
            : 'bg-gradient-to-r from-blue-300/25 to-cyan-300/25'
        } rounded-full blur-lg animate-ping`}></div>
        
        {/* Particle Ring 3 */}
        <div className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 ${
          darkMode 
            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' 
            : 'bg-gradient-to-r from-yellow-300/30 to-orange-300/30'
        } rounded-full blur-md animate-bounce`}></div>
      </div>

      {/* Sparkle Effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className={`absolute w-1 h-1 ${
              darkMode ? 'bg-white/40' : 'bg-yellow-400/60'
            } rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'opacity-[0.02]' 
          : 'opacity-[0.03]'
      }`}>
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern 
              id="grid" 
              width="60" 
              height="60" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke={darkMode ? "#ffffff" : "#000000"} 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatBlob {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -60%) scale(1.1) rotate(90deg);
          }
          50% {
            transform: translate(-40%, -50%) scale(0.9) rotate(180deg);
          }
          75% {
            transform: translate(-60%, -40%) scale(1.05) rotate(270deg);
          }
        }

        @keyframes floatIcon {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-50%, -60%) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(-40%, -50%) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translate(-60%, -40%) rotate(270deg) scale(1.05);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(15deg);
          }
          50% {
            transform: rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingBackground;
