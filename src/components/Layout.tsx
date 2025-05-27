// src/components/Layout.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  Scissors, 
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Search,
  Menu,
  Sparkles
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'داشبورد' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { name: 'داشبورد', icon: BarChart3, emoji: '📊', color: 'from-purple-500 to-pink-500', href: '/dashboard' },
    { name: 'نوبت‌ها', icon: Calendar, emoji: '📅', color: 'from-blue-500 to-cyan-500', href: '/appointments' },
    { name: 'مشتریان', icon: Users, emoji: '👥', color: 'from-green-500 to-emerald-500', href: '/customers' },
    { name: 'خدمات', icon: Scissors, emoji: '✂️', color: 'from-orange-500 to-red-500', href: '/services' },
    { name: 'گزارش‌ها', icon: PieChart, emoji: '📈', color: 'from-indigo-500 to-purple-500', href: '/reports' },
    { name: 'تنظیمات', icon: Settings, emoji: '⚙️', color: 'from-gray-500 to-slate-500', href: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-xl border-b border-white/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-2xl">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  💄 آرایشگاه زیبایی ✨
                </h1>
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('fa-IR')} | {currentTime.toLocaleTimeString('fa-IR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative group">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="جستجو..."
                  className="pl-12 pr-6 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white/80 backdrop-blur-sm w-64"
                />
              </div>
              <button className="relative p-3 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 text-white hover:scale-110 transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-3 rounded-2xl bg-purple-500 text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 transition-transform duration-300 lg:static w-72 bg-white/80 backdrop-blur-xl border-l border-white/30 z-40 shadow-xl`}>
          <nav className="mt-8 px-6">
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 group ${
                    currentPage === item.name
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105` 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <span className="text-2xl ml-3">{item.emoji}</span>
                  <item.icon className="w-5 h-5 ml-3" />
                  <span className="font-medium">{item.name}</span>
                  {currentPage === item.name && (
                    <Sparkles className="w-5 h-5 mr-auto animate-spin text-white" />
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 relative z-10">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/25 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
