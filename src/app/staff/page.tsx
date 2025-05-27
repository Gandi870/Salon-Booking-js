// src/app/staff/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users,
  UserPlus,
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Award,
  TrendingUp,
  DollarSign,
  Scissors,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Settings,
  Crown,
  Gem,
  Heart,
  Zap,
  Sparkles,
  Smile,
  Camera,
  Upload,
  X,
  Save,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowUp,
  ArrowDown,
  Palette
} from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  completedServices: number;
  revenue: number;
  availability: 'available' | 'busy' | 'offline';
  phone: string;
  email: string;
  joinDate: string;
  specialties: string[];
  workingHours: string;
  commission: number;
  monthlyTarget: number;
  todayAppointments: number;
  experience: string;
  status: 'active' | 'inactive';
  emoji: string;
}

const StaffManagement = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: 'احمد حسینی',
      role: 'آرایشگر ارشد',
      avatar: '👨‍🦱',
      rating: 4.9,
      completedServices: 1247,
      revenue: 45750000,
      availability: 'available',
      phone: '09123456789',
      email: 'ahmad@salon.com',
      joinDate: '1401/03/15',
      specialties: ['اصلاح مو', 'ریش تراشی', 'رنگ مو'],
      workingHours: '9:00 - 18:00',
      commission: 15,
      monthlyTarget: 50000000,
      todayAppointments: 8,
      experience: '5+ سال',
      status: 'active',
      emoji: '🔥'
    },
    {
      id: 2,
      name: 'مریم زارعی',
      role: 'متخصص رنگ',
      avatar: '👩‍🦰',
      rating: 4.8,
      completedServices: 892,
      revenue: 38200000,
      availability: 'busy',
      phone: '09234567890',
      email: 'maryam@salon.com',
      joinDate: '1401/05/22',
      specialties: ['رنگ مو', 'هایلایت', 'بالیاژ'],
      workingHours: '10:00 - 19:00',
      commission: 18,
      monthlyTarget: 40000000,
      todayAppointments: 6,
      experience: '3+ سال',
      status: 'active',
      emoji: '🎨'
    },
    {
      id: 3,
      name: 'علی محمدی',
      role: 'آرایشگر',
      avatar: '👨‍💼',
      rating: 4.6,
      completedServices: 634,
      revenue: 22100000,
      availability: 'available',
      phone: '09345678901',
      email: 'ali@salon.com',
      joinDate: '1401/08/10',
      specialties: ['اصلاح مو', 'ماساژ صورت'],
      workingHours: '14:00 - 22:00',
      commission: 12,
      monthlyTarget: 25000000,
      todayAppointments: 4,
      experience: '2+ سال',
      status: 'active',
      emoji: '⚡'
    },
    {
      id: 4,
      name: 'فاطمه کریمی',
      role: 'متخصص ناخن',
      avatar: '👩‍💅',
      rating: 4.7,
      completedServices: 445,
      revenue: 18900000,
      availability: 'offline',
      phone: '09456789012',
      email: 'fatemeh@salon.com',
      joinDate: '1401/11/03',
      specialties: ['طراحی ناخن', 'ژل', 'اکریلیک'],
      workingHours: '12:00 - 20:00',
      commission: 20,
      monthlyTarget: 20000000,
      todayAppointments: 0,
      experience: '4+ سال',
      status: 'inactive',
      emoji: '💎'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'revenue' | 'services'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // فیلتر و جستجو
  const filteredStaff = staff
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'revenue':
          comparison = a.revenue - b.revenue;
          break;
        case 'services':
          comparison = a.completedServices - b.completedServices;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // آماده‌سازی داده‌های آماری
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const totalRevenue = staff.reduce((sum, s) => sum + s.revenue, 0);
  const avgRating = staff.reduce((sum, s) => sum + s.rating, 0) / staff.length;
  const totalServices = staff.reduce((sum, s) => sum + s.completedServices, 0);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'آزاد';
      case 'busy':
        return 'مشغول';
      case 'offline':
        return 'غیرفعال';
      default:
        return 'نامشخص';
    }
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fa-IR') + ' تومان';
  };

  const handleDeleteStaff = (id: number) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setStaff(prev => prev.map(s => 
      s.id === id 
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 relative">
      {/* عناصر تزئینی پس‌زمینه */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-purple-500/50">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold flex items-center">
                    <Users className="w-10 h-10 ml-4 animate-pulse" />
                    مدیریت متخصصان
                    <Crown className="w-8 h-8 mr-3 animate-spin" style={{ animationDuration: '4s' }} />
                  </h1>
                  <p className="text-purple-100 text-xl mt-2 flex items-center">
                    <Gem className="w-6 h-6 ml-2 animate-bounce" />
                    مدیریت تیم حرفه‌ای آرایشگاه
                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center font-bold shadow-xl"
                >
                  <UserPlus className="w-6 h-6 ml-2" />
                  متخصص جدید
                  <Plus className="w-5 h-5 mr-2" />
                </button>
              </div>
            </div>
            {/* عناصر تزئینی */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
            <Heart className="absolute bottom-8 left-8 w-6 h-6 text-white/40 animate-pulse" />
          </div>
        </div>

        {/* آمار کلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl group-hover:animate-bounce">👥</div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">کل متخصصان</h3>
            <p className="text-3xl font-bold text-gray-800">{totalStaff}</p>
            <p className="text-green-600 text-sm font-medium mt-2">✨ فعال: {activeStaff}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl group-hover:animate-bounce">💰</div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">کل درآمد</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
            <div className="flex items-center text-green-600 text-sm font-medium mt-2">
              <ArrowUp className="w-4 h-4 ml-1" />
              +12% نسبت به ماه قبل
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl group-hover:animate-bounce">⭐</div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">میانگین رضایت</h3>
            <p className="text-3xl font-bold text-gray-800">{avgRating.toFixed(1)}/5</p>
            <p className="text-yellow-600 text-sm font-medium mt-2">🌟 عالی</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl group-hover:animate-bounce">🎯</div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">کل خدمات</h3>
            <p className="text-3xl font-bold text-gray-800">{totalServices.toLocaleString('fa-IR')}</p>
            <p className="text-purple-600 text-sm font-medium mt-2">📈 رشد مستمر</p>
          </div>
        </div>

        {/* فیلتر و جستجو */}
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/50 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* جستجو */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجوی متخصص... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pl-12 bg-white/70 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* فیلترها */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="bg-white/70 border border-gray-200/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="all">همه</option>
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">مرتب‌سازی:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white/70 border border-gray-200/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="rating">امتیاز</option>
                  <option value="name">نام</option>
                  <option value="revenue">درآمد</option>
                  <option value="services">تعداد خدمات</option>
                </select>
              </div>

              {/* تغییر نمایش */}
              <div className="flex items-center bg-white/70 rounded-xl p-1 border border-gray-200/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'table' 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* نمایش متخصصان */}
        {viewMode === 'grid' ? (
          // نمایش کارتی
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStaff.map((member, index) => (
              <div
                key={member.id}
                className="bg-white/80 rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* وضعیت انلاین */}
                <div className="absolute top-4 right-4">
                  <div className={`w-4 h-4 ${getAvailabilityColor(member.availability)} rounded-full animate-pulse shadow-lg`}></div>
                </div>

                {/* آواتار و اطلاعات اصلی */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1 shadow-lg">
                      <span className="text-sm">{member.emoji}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium text-sm">{member.role}</p>
                  <p className="text-gray-500 text-xs mt-1">{member.experience}</p>
                </div>

                {/* امتیاز و آمار */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                      <span className="font-bold text-gray-800">{member.rating}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {member.status === 'active' ? '✅ فعال' : '❌ غیرفعال'}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50/80 to-white/80 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">خدمات انجام شده:</span>
                      <span className="font-bold text-gray-800">{member.completedServices.toLocaleString('fa-IR')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">درآمد:</span>
                      <span className="font-bold text-green-600">{(member.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">نوبت‌های امروز:</span>
                      <span className="font-bold text-blue-600">{member.todayAppointments}</span>
                    </div>
                  </div>

                  {/* وضعیت دسترسی */}
                  <div className={`text-center py-2 px-4 rounded-xl text-sm font-medium ${
                    member.availability === 'available' ? 'bg-green-100 text-green-700' :
                    member.availability === 'busy' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {getAvailabilityText(member.availability)}
                  </div>

                  {/* دکمه‌های عملیات */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        setSelectedStaff(member);
                        setShowDetailModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStaff(member);
                        setShowEditModal(true);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(member.id)}
                      className={`p-2 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        member.status === 'active'
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}
                    >
                      {member.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* عنصر درخشان */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // نمایش جدولی
          <div className="bg-white/80 rounded-3xl shadow-xl backdrop-blur-xl border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-right font-bold">متخصص</th>
                    <th className="px-6 py-4 text-right font-bold">نقش</th>
                    <th className="px-6 py-4 text-right font-bold">امتیاز</th>
                    <th className="px-6 py-4 text-right font-bold">خدمات</th>
                    <th className="px-6 py-4 text-right font-bold">درآمد</th>
                    <th className="px-6 py-4 text-right font-bold">وضعیت</th>
                    <th className="px-6 py-4 text-right font-bold">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((member, index) => (
                    <tr key={member.id} className={`border-b border-gray-100/50 hover:bg-purple-50/30 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                    }`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mr-3 shadow-lg">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{member.name}</div>
                            <div className="text-gray-500 text-sm">{member.experience}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                          <span className="font-bold">{member.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-800">{member.completedServices.toLocaleString('fa-IR')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">{formatCurrency(member.revenue)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 ${getAvailabilityColor(member.availability)} rounded-full ml-2 animate-pulse`}></div>
                          <span className="text-sm font-medium">{getAvailabilityText(member.availability)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedStaff(member);
                              setShowDetailModal(true);
                            }}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            title="مشاهده جزئیات"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStaff(member);
                              setShowEditModal(true);
                            }}
                            className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                            title="ویرایش"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(member.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              member.status === 'active'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                            title={member.status === 'active' ? 'غیرفعال کردن' : 'فعال کردن'}
                          >
                            {member.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* نمایش در صورت عدم وجود نتیجه */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">متخصصی یافت نشد</h3>
            <p className="text-gray-500">لطفاً جستجوی خود را تغییر دهید یا فیلترها را بازنشانی کنید.</p>
          </div>
        )}
      </div>

      {/* مودال‌ها در ادامه کامنت... */}
    </div>
  );
};

export default StaffManagement;
