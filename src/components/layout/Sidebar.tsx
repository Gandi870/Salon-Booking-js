// src/components/layout/Sidebar.tsx
'use client';

import React from 'react';
import {
  BarChart3,
  Calendar,
  Users,
  Scissors,
  PieChart,
  Settings,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, darkMode }) => {
  const menuItems = [
    { 
      name: 'داشبورد', 
      icon: BarChart3, 
      active: true, 
      emoji: '📊',
      color: 'from-purple-500 to-pink-500',
      href: '/dashboard'
    },
    { 
      name: 'نوبت‌ها', 
      icon: Calendar, 
      emoji: '📅', 
      color 'from-blue-500 to-cyan-500',
      href: '/appointments'
    },
    { 
      name: 'مشتریان', 
      icon: Users, 
      emoji: '👥',
      color: 'from-green-500 to-emerald-500',
      href: '/customers'
    },
    { 
      name: 'خدمات', 
      icon: Scissors, 
      emoji: '✂️', 
      color: 'from-orange-500 to-red-500',
      href: '/services'
    },
    { 
      name: 'گزارش‌ها', 
      icon: PieChart, 
      emoji: '📈', 
     color: 'from-indigo-500 to-purple-500',
      href: '/reports'
    },
    { 
      name: 'تنظیمات', 
      icon: Settings, 
      emoji: '⚙️', 
      color: 'from-gray-500 to-slate-500',
      href: '/settings'
    }
  ];

  return (
    <>
      {/* Overlay برای موبایل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
        lg:translate-x-0 transition-transform duration-500 ease-in-out 
        lg:static lg:inset-0 w-72 z-40 
        ${darkMode 
          ? 'bg-gray-800/90 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl shadow-purple-500/10' 
          : 'bg-white/90 backdrop-blur-xl border-l border-white/30 shadow-2xl shadow-purple-500/10'
        }
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">✨</span>
              </div>
              <div className="mr-3">
                <h2 className={`text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent`}>
                  آرایشگاه زیبا
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  پنل مدیریت
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`
                    flex items-center px-6 py-4 rounded-2xl transition-all duration-500 
                    hover:shadow-xl group relative overflow-hidden
                    ${item.active 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-2xl shadow-purple-500/50 scale-105` 
                      : `${darkMode 
                          ? 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-pink-900/50 hover:text-white' 
                          : 'text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600'
                        } hover:scale-105`
                    }
                  `}
                >
                  <div className="flex items-center flex-1">
                    <span className="text-2xl ml-3 group-hover:animate-bounce transition-transform duration-300">
                      {item.emoji}
                    </span>
                    <item.icon className="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  
                  {item.active && (
                    <div className="mr-auto">
                      <Sparkles className="w-5 h-5 animate-spin text-white" />
                    </div>
                  )}
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200/20">
            <div className={`p-4 rounded-2xl ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-purple-600'}`}>
                💡 کته روز
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                رضایت مشتری کلید موفقیت است
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
