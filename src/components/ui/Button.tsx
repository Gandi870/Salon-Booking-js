// src/components/ui/Button.tsx
'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  gradient?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ComponentType<{className?: string}>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  gradient,
  className = '',
  onClick,
  disabled = false,
  icon: Icon
}) => {
  const variants = {
    primary: gradient || 'from-violet-500 to-purple-500',
    secondary: 'from-gray-400 to-gray-500',
    success: 'from-emerald-500 to-teal-500',
    warning: 'from-orange-500 to-amber-500',
    danger: 'from-rose-500 to-red-500'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group overflow-hidden rounded-xl font-bold text-white
        bg-gradient-to-r ${variants[variant]}
        ${sizes[size]}
        transition-all duration-300
        hover:scale-110 hover:shadow-xl hover:shadow-${variant}-500/40
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        shadow-lg active:scale-95
        ${className}
      `}
    >
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        {Icon && <Icon className="w-5 h-5 group-hover:animate-pulse" />}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
