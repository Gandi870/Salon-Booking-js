'use client';

import React, { useState } from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "آرایشگاه آرایا",
  subtitle = "پنل مدیریت نوبت‌دهی",
  userName = "مدیر"
}) => {
  const [notifications] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const currentTime = new Date().toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          
          {/* Logo & Title Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-2xl shadow-lg">
                <span className="text-white text-2xl">💅</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="جستجو در مشتریان، نوبت‌ها..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            
            {/* Date & Time */}
            <div className="hidden md:flex flex-col items-end bg-gray-50 rounded-2xl p-3">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-lg">📅</span>
                <span className="text-sm font-medium">{currentDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <span className="text-sm">🕐</span>
                <span className="text-xs">{currentTime}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="relative p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 group">
                <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Messages */}
              <button className="relative p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 group">
                <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl px-4 py-3 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-105 transition-transform">
                  {userName.charAt(0)}
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    آنلاین
                  </p>
                </div>
                <span className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}>
                  ⌄
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{userName}</p>
                    <p className="text-sm text-gray-500">مدیر سیستم</p>
                  </div>
                  
                  {[
                    { icon: '👤', label: 'پروفایل من', action: () => {} },
                    { icon: '⚙️', label: 'تنظیمات', action: () => {} },
                    { icon: '📊', label: 'گزارش‌ها', action: () => {} },
                    { icon: '🚪', label: 'خروج', action: () => {} }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
