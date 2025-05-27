// src/components/dashboard/QuickActions.tsx
'use client';

import React from 'react';
import {
  Plus,
  Calendar,
  Users,
  Scissors,
  PieChart,
  Zap,
  Crown,
  Heart,
  Sparkles
} from 'lucide-react';
import Button from '../ui/Button';

interface QuickActionsProps {
  darkMode: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ darkMode }) => {
  const quickActions = [
    {
      id: 1,
      title: 'ثبت نوبت جدید',
      description: 'افزودن نوبت برای مشتری',
      icon: Plus,
      color: 'from-blue-500 to-purple-500',
      bgColor: darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50',
      onClick: () => console.log('New appointment')
    },
    {
      id: 2,
      title: 'مدیریت نوبت‌ها',
      description: 'مشاهده و ویرایش نوبت‌ها',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-500',
      bgColor: darkMode ? 'from-emerald-900/20 to-teal-900/20' : 'from-emerald-50 to-teal-50',
      onClick: () => console.log('Manage appointments')
    },
    {
      id: 3,
      title: 'افزودن مشتری',
      description: 'ثبت اطلاعات مشتری جدید',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
      bgColor: darkMode ? 'from-pink-900/20 to-rose-900/20' : 'from-pink-50 to-rose-50',
      onClick: () => console.log('Add customer')
    },
    {
      id: 4,
      title: 'خدمات ویژه',
      description: 'مدیریت سرویس‌های پریمیوم',
      icon: Crown,
      color: 'from-yellow-500 to-orange-500',
      bgColor: darkMode ? 'from-yellow-900/20 to-orange-900/20' : 'from-yellow-50 to-orange-50',
      onClick: () => console.log('Premium services')
    }
  ];

  return (
    <div className={`
      p-6 rounded-2xl border-2 transition-all duration-300 mb-6 sm:mb-8
      ${darkMode 
        ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-md' 
        : 'bg-white/80 border-white/50 backdrop-blur-md'
      }
      shadow-xl hover:shadow-2xl
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="mr-3">
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              عملیات سریع
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              دسترسی آسان به ابزارهای پرکاربرد
            </p>
          </div>
        </div>
        
        <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
      </div>
      
      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`
                p-6 rounded-2xl border transition-all duration-300
                text-right group hover:scale-105 hover:shadow-xl
                ${darkMode 
                  ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50 hover:border-gray-500/50' 
                  : `bg-gradient-to-br ${action.bgColor} border-gray-200/50 hover:border-gray-300/50`
                }
                hover:shadow-purple-500/25
              `}
            >
              {/* Icon */}
              <div className={`
                inline-flex p-3 rounded-2xl bg-gradient-to-r ${action.color} 
                shadow-lg group-hover:shadow-2xl transition-all duration-300
                group-hover:scale-110 mb-4
              `}>
                <IconComponent className="w-6 h-6 text-white group-hover:animate-pulse" />
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className={`font-bold text-base ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {action.description}
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
          );
        })}
      </div>
      
      {/* Premium Action */}
      <div className="mt-6 pt-6 border-t border-gray-200/20">
        <Button
          variant="primary"
          size="lg"
          gradient="from-purple-600 via-pink-600 to-red-600"
          icon={Heart}
          className="w-full group"
          onClick={() => console.log('Premium action')}
        >
          <span className="flex items-center justify-center">
            <Heart className="w-5 h-5 ml-2 group-hover:animate-bounce" />
            ارتقاء به حساب ویژه
            <Crown className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
