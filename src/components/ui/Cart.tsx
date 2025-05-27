// src/components/ui/Card.tsx
'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  glowColor?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  gradient = 'from-white/80 to-gray-50/80',
  glowColor = 'shadow-purple-500/20',
  onClick,
  hover = true
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border-2 backdrop-blur-md
        bg-gradient-to-br ${gradient}
        border-white/50 shadow-xl ${glowColor}
        transition-all duration-500
        ${hover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
