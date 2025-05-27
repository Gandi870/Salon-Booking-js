// src/app/dashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Scissors,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Bell,
  Search,
  Menu,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Plus,
  Filter,
  Heart,
  Zap,
  Crown,
  Gem,
  Palette,
  Wand2,
  Flower2,
  Smile,
  UserPlus,
  Edit3,
  Save,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Camera,
  Target,
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ایجاد عناصر شناور برای انیمیشن پس‌زمینه
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setFloatingElements(elements);
  }, []);

  // ردیابی موقعیت ماوس برای افکت‌های تعاملی
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const statsCards = [
    {
      id: 1,
      title: 'نوبت‌های امروز',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 via-purple-500 to-pink-500',
      bgPattern:
        'bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-pink-50/80',
      shadowColor: 'shadow-blue-500/25',
      glowColor: 'shadow-blue-400/50',
    },
    {
      id: 2,
      title: 'مشتریان فعال',
      value: '142',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      bgPattern:
        'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-rose-50/80',
      shadowColor: 'shadow-purple-500/25',
      glowColor: 'shadow-purple-400/50',
    },
    {
      id: 3,
      title: 'درآمد امروز',
      value: '2,450,000',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 via-emerald-500 to-teal-500',
      bgPattern:
        'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/80',
      shadowColor: 'shadow-green-500/25',
      glowColor: 'shadow-green-400/50',
    },
    {
      id: 4,
      title: 'رضایت مشتریان',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'from-yellow-500 via-orange-500 to-red-500',
      bgPattern:
        'bg-gradient-to-br from-yellow-50/80 via-orange-50/60 to-red-50/80',
      shadowColor: 'shadow-yellow-500/25',
      glowColor: 'shadow-yellow-400/50',
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'نوبت جدید',
      icon: Plus,
      color: 'from-blue-500 to-purple-500',
      emoji: '📅',
    },
    {
      id: 2,
      title: 'مشتری جدید',
      icon: Users,
      color: 'from-green-500 to-blue-500',
      emoji: '👤',
    },
    {
      id: 3,
      title: 'گزارشات',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      emoji: '📊',
    },
    {
      id: 4,
      title: 'تنظیمات',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      emoji: '⚙️',
    },
  ];

  // اصلاح مشکل در خط 118
  const menuItems = [
    {
      name: 'داشبورد',
      icon: BarChart3,
      active: true,
      emoji: '📊',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'نوبت‌ها',
      icon: Calendar,
      emoji: '📅',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'مشتریان',
      icon: Users,
      emoji: '👥',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'خدمات',
      icon: Scissors,
      emoji: '✂️',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const formatCurrency = (amount: string): string => {
    return parseInt(amount).toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative">
      {/* عناصر شناور پس‌زمینه */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {floatingElements.map(element => (
          <div
            key={element.id}
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl transform transition-transform duration-500 z-20">
          {/* Logo */}
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div className="mr-4">
                <h2 className="font-bold text-xl text-gray-800">
                  آرایشگاه زیبا
                </h2>
                <p className="text-gray-500 text-sm">مدیریت حرفه‌ای</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    item.active
                      ? `bg-gradient-to-r ${item.color} text-white shadow-xl shadow-purple-500/50`
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl ml-3 group-hover:animate-bounce">
                      {item.emoji}
                    </span>
                    <item.icon className="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.active && (
                    <div className="mr-auto">
                      <Sparkles className="w-4 h-4 animate-spin text-white" />
                    </div>
                  )}
                </a>
              ))}
            </div>
          </nav>

          {/* search در sidebar */}
          <div className="p-6 mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجوی جادویی... 🔍"
                className="w-full py-3 px-4 pl-12 bg-white/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-500 backdrop-blur-sm hover:shadow-lg focus:shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-72">
          <main className="p-8">
            {/* Welcome Section */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-purple-500/50">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <h2 className="text-4xl font-bold">خوش آمدید! </h2>
                    <div className="text-4xl animate-bounce ml-3">👋</div>
                    <Wand2 className="w-8 h-8 ml-3 animate-pulse" />
                  </div>
                  <p className="text-purple-100 text-xl flex items-center">
                    <Flower2
                      className="w-6 h-6 ml-2 animate-spin"
                      style={{ animationDuration: '4s' }}
                    />
                    امروز روز پرکاری است! {statsCards[0].value} نوبت جادویی در
                    انتظار شماست.
                    <Smile className="w-6 h-6 mr-2 animate-pulse" />
                  </p>
                </div>
                {/* عناصر تزئینی شناور */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full animate-bounce"
                  style={{ animationDuration: '3s' }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"
                  style={{ animationDelay: '1s' }}
                ></div>
                <Gem
                  className="absolute top-8 right-8 w-8 h-8 text-white/30 animate-spin"
                  style={{ animationDuration: '5s' }}
                />
                <Heart className="absolute bottom-8 left-8 w-6 h-6 text-white/40 animate-pulse" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {statsCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`${card.bgPattern} rounded-3xl p-8 border border-white/50 hover:shadow-2xl ${card.glowColor} transition-all duration-700 cursor-pointer transform hover:-translate-y-4 hover:rotate-1 ${
                    activeCard === card.id ? 'scale-110 rotate-2' : ''
                  } group relative overflow-hidden`}
                  onMouseEnter={() => setActiveCard(card.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* عنصر شناور پس‌زمینه */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-2xl ${card.shadowColor} group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}
                      >
                        <card.icon className="w-8 h-8 text-white group-hover:animate-pulse" />
                      </div>
                      <div
                        className={`flex items-center space-x-2 space-x-reverse text-sm font-bold ${
                          card.trend === 'up'
                            ? 'text-green-600'
                            : 'text-red-600'
                        } group-hover:scale-110 transition-transform duration-300`}
                      >
                        {card.trend === 'up' ? (
                          <ArrowUp className="w-5 h-5 animate-bounce" />
                        ) : (
                          <ArrowDown className="w-5 h-5 animate-bounce" />
                        )}
                        {card.change}
                        <Zap className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm font-semibold mb-2 group-hover:text-gray-800 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-800 group-hover:scale-105 transition-transform duration-300">
                      {card.id === 3 ? formatCurrency(card.value) : card.value}
                      {card.id === 4 && (
                        <span className="text-lg text-gray-500">/5 ⭐</span>
                      )}
                    </p>
                  </div>

                  {/* عنصر درخشان */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Activity className="w-8 h-8 ml-3 animate-pulse" />
                اقدامات سریع
                <Palette
                  className="w-6 h-6 mr-3 animate-spin"
                  style={{ animationDuration: '3s' }}
                />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <button
                    key={action.id}
                    className={`bg-gradient-to-r ${action.color} text-white p-6 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:rotate-2 group relative overflow-hidden`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3 group-hover:animate-bounce">
                        {action.emoji}
                      </div>
                      <action.icon className="w-10 h-10 mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300" />
                      <p className="text-sm font-bold group-hover:scale-105 transition-transform duration-300">
                        {action.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white/80 rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/50 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Clock className="w-8 h-8 ml-3 animate-pulse" />
                  نوبت‌های اخیر
                  <Crown
                    className="w-6 h-6 mr-3 animate-spin"
                    style={{ animationDuration: '4s' }}
                  />
                </h3>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center">
                  <Plus className="w-5 h-5 ml-2" />
                  نوبت جدید
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((appointment, index) => (
                  <div
                    key={appointment}
                    className="bg-gradient-to-br from-white/90 to-gray-50/90 rounded-2xl p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {['س', 'م', 'ز'][index]}
                        </div>
                        <div className="mr-3">
                          <p className="font-bold text-gray-800">
                            مشتری {appointment}
                          </p>
                          <p className="text-gray-500 text-sm">اصلاح مو</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-purple-600">
                          {9 + index}:00
                        </p>
                        <p className="text-gray-500 text-sm">امروز</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-3 group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800 font-medium text-sm">
                          ✅ تأیید شده
                        </span>
                        <span className="text-emerald-600 font-bold">
                          {150 + index * 50} هزار تومان
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts and Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <div className="bg-white/80 rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <TrendingUp className="w-6 h-6 ml-2 animate-pulse" />
                    نمودار درآمد
                  </h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select className="bg-transparent border-0 text-sm text-gray-600 focus:outline-none">
                      <option>هفته اخیر</option>
                      <option>ماه اخیر</option>
                    </select>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <PieChart
                      className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-spin"
                      style={{ animationDuration: '5s' }}
                    />
                    <p className="text-gray-600">نمودار در حال بارگذاری...</p>
                  </div>
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="bg-white/80 rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Award className="w-6 h-6 ml-2 animate-pulse" />
                    رضایت مشتریان
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current animate-pulse" />
                    <span className="text-2xl font-bold text-gray-800 mr-2">
                      4.8
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: 'کیفیت خدمات',
                      value: 95,
                      color: 'from-green-500 to-emerald-500',
                    },
                    {
                      label: 'رعایت وقت',
                      value: 88,
                      color: 'from-blue-500 to-cyan-500',
                    },
                    {
                      label: 'قیمت مناسب',
                      value: 92,
                      color: 'from-purple-500 to-pink-500',
                    },
                    {
                      label: 'رفتار کارکنان',
                      value: 97,
                      color: 'from-yellow-500 to-orange-500',
                    },
                  ].map((item, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {item.value}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out transform group-hover:scale-x-105`}
                          style={{
                            width: `${item.value}%`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
