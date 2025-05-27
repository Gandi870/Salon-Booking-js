// src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Sun, Moon, Settings } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, darkMode, onDarkModeToggle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={`
      sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300
      ${darkMode 
        ? 'border-gray-700/50 bg-gray-800/80' 
        : 'border-white/50 bg-white/80'
      }
    `}>
      <div className="px-3 sm:px-4 md:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Right Side */}
          <div className="flex items-center min-w-0 flex-1">
            <button 
              onClick={onMenuToggle}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-white/80'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center min-w-0 mr-2 sm:mr-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">✨</span>
              </div>
              <div className="mr-2 sm:mr-3 min-w-0">
                <h1 className={`text-base sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent truncate`}>
                  آرایشگاه زیبا
                </h1>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} hidden sm:block`}>
                  {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
          
          {/* Left Side */}
          <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden sm:block">
              <Search className={`w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-purple-400'
              }`} />
              <input 
                type="text" 
                placeholder="جستجو... 🔍"
                className={`pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-32 sm:w-48 md:w-64 transition-all duration-300 shadow-lg ${
                  darkMode 
                    ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white/80 border-purple-200 text-gray-900 placeholder-purple-400'
                }`}
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:scale-110 ${
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-yellow-500/40' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-purple-500/40'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            {/* Notifications */}
            <button className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:scale-110 ${
              darkMode 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/40' 
                : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-rose-500/40'
            }`}>
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
