// src/components/dashboard/StatsCards.tsx
'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import Card from '../ui/Card';

interface StatsCardsProps {
  darkMode: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ darkMode }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const statsData = [
    {
      id: 1,
      title: 'نوبت‌های امروز',
      value: '24',
      unit: 'نوبت',
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 via-purple-500 to-pink-500',
      bgPattern: 'from-blue-50/80 via-purple-50/60 to-pink-50/80',
      shadowColor: 'shadow-blue-500/25',
      glowColor: 'shadow-blue-400/50'
    },
    {
      id: 2,
      title: 'مشتریان فعال',
      value: '142',
      unit: 'نفر',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      bgPattern: 'from-purple-50/80 via-pink-50/60 to-rose-50/80',
      shadowColor: 'shadow-purple-500/25',
      glowColor: 'shadow-purple-400/50'
    },
    {
      id: 3,
      title: 'درآمد امروز',
      value: '2,450,000',
      unit: 'تومان',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 via-emerald-500 to-teal-500',
      bgPattern: 'from-green-50/80 via-emerald-50/60 to-teal-50/80',
      shadowColor: 'shadow-green-500/25',
      glowColor: 'shadow-green-400/50'
    },
    {
      id: 4,
      title: 'رضایت مشتریان',
      value: '4.8',
      unit: 'از ۵',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'from-yellow-500 via-orange-500 to-red-500',
      bgPattern: 'from-yellow-50/80 via-orange-50/60 to-red-50/80',
      shadowColor: 'shadow-yellow-500/25',
      glowColor: 'shadow-yellow-400/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
        
        return (
          <Card
            key={stat.id}
            className={`
              p-4 sm:p-6 relative overflow-hidden cursor-pointer transition-all duration-500
              ${activeCard === stat.id ? 'scale-105' : ''}
              ${darkMode 
                ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50' 
                : `bg-gradient-to-br ${stat.bgPattern} border-white/50`
              }
              hover:shadow-2xl hover:${stat.glowColor}
            `}
            onClick={() => setActiveCard(activeCard === stat.id ? null : stat.id)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className={`w-full h-full bg-gradient-to-br ${stat.color}`} />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`
                p-3 rounded-2xl bg-gradient-to-r ${stat.color} 
                shadow-lg hover:shadow-2xl transition-all duration-300
                hover:scale-110 group
              `}>
                <IconComponent className="w-6 h-6 text-white group-hover:animate-pulse" />
              </div>
              
              <div className={`
                flex items-center space-x-1 space-x-reverse px-3 py-1.5 rounded-full text-sm font-bold
                ${stat.trend === 'up' 
                  ? 'bg-emerald-100 text-emerald-600' 
                  : 'bg-red-100 text-red-600'
                }
              `}>
                <TrendIcon className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-2">
              <h3 className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stat.title}
              </h3>
              
              <div className="flex items-baseline space-x-2 space-x-reverse">
                <span className={`text-2xl sm:text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </span>
                <span className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {stat.unit}
                </span>
              </div>
            </div>
            
            {/* Expanded Content */}
            {activeCard === stat.id && (
              <div className="mt-4 pt-4 border-t border-gray-200/20 animate-in slide-in-from-top duration-300">
                <div className="flex items-center justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    این ماه:
                  </span>
                  <span className={`font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    +{Math.floor(Math.random() * 50)}%
                  </span>
                </div>
                
                <div className="flex items-center mt-2">
                  <Sparkles className="w-4 h-4 text-purple-500 ml-2" />
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    عملکرد عالی
                  </span>
                </div>
              </div>
            )}
            
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
