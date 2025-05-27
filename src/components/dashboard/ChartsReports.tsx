// src/components/dashboard/ChartsReports.tsx
'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  DollarSign,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import Card from '../ui/Card';

interface ChartsReportsProps {
  darkMode: boolean;
}

const ChartsReports: React.FC<ChartsReportsProps> = ({ darkMode }) => {
  const [activeChart, setActiveChart] = useState<string>('revenue');

  // Mock data for charts
  const revenueData = [
    { month: 'فروردین', value: 2400000 },
    { month: 'اردیبهشت', value: 2800000 },
    { month: 'خرداد', value: 3200000 },
    { month: 'تیر', value: 2950000 },
    { month: 'مرداد', value: 3600000 },
    { month: 'شهریور', value: 4200000 }
  ];

  const serviceData = [
    { name: 'کراتین مو', percentage: 35, color: 'from-purple-500 to-pink-500' },
    { name: 'رنگ مو', percentage: 28, color: 'from-blue-500 to-cyan-500' },
    { name: 'کوتاهی مو', percentage: 20, color: 'from-green-500 to-emerald-500' },
    { name: 'پکیج کامل', percentage: 17, color: 'from-orange-500 to-red-500' }
  ];

  const chartTypes = [
    { id: 'revenue', name: 'درآمد', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { id: 'customers', name: 'مشتریان', icon: Users, color: 'from-blue-500 to-purple-500' },
    { id: 'services', name: 'خدمات', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
    { id: 'appointments', name: 'نوبت‌ها', icon: Calendar, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
      {/* Revenue Chart */}
      <Card
        className={`p-6 ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/80 border-white/50'
        }`}
      >
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="mr-3">
              <h3 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                نمودار درآمد
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ۶ ماه اخیر
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse text-sm font-bold text-green-600">
            <ArrowUp className="w-4 h-4" />
            <span>+23%</span>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-3">
          {revenueData.map((item, index) => {
            const maxValue = Math.max(...revenueData.map(d => d.value));
            const percentage = (item.value / maxValue) * 100;
            
            return (
              <div key={index} className="flex items-center space-x-4 space-x-reverse">
                <div className={`w-20 text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.month}
                </div>
                
                <div className="flex-1">
                  <div className={`h-8 rounded-lg relative overflow-hidden ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg transition-all duration-1000 ease-out relative"
                      style={{ 
                        width: `${percentage}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className={`w-24 text-sm font-bold text-left ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {(item.value / 1000000).toFixed(1)}M
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Services Pie Chart */}
      <Card
        className={`p-6 ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/80 border-white/50'
        }`}
      >
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <div className="mr-3">
              <h3 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                محبوبیت خدمات
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                این ماه
              </p>
            </div>
          </div>
          
          <Sparkles className="w-6 h-6 text-purple-500 animate-spin" />
        </div>

        {/* Pie Chart (Simple Circle Progress) */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            {serviceData.map((service, index) => {
              const strokeDasharray = `${service.percentage * 3.14159} 314.159`;
              const strokeDashoffset = index > 0 ? -serviceData.slice(0, index).reduce((sum, s) => sum + s.percentage, 0) * 3.14159 : 0;
              
              return (
                <svg key={index} className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ animationDelay: `${index * 300}ms` }}
                  />
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={service.color.includes('purple') ? '#8b5cf6' : service.color.includes('blue') ? '#3b82f6' : service.color.includes('green') ? '#10b981' : '#f59e0b'} />
                      <stop offset="100%" stopColor={service.color.includes('pink') ? '#ec4899' : service.color.includes('cyan') ? '#06b6d4' : service.color.includes('emerald') ? '#059669' : '#dc2626'} />
                    </linearGradient>
                  </defs>
                </svg>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {serviceData.map((service, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${service.color}`}></div>
                <span className={`font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {service.name}
                </span>
              </div>
              <span className={`font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                %{service.percentage}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ChartsReports;
