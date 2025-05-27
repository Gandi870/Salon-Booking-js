import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Star,
  DollarSign,
  Activity,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Bell,
  Calendar as CalendarIcon,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Sparkles,
  Wand2,
  Heart,
  Smile,
  Zap
} from 'lucide-react';

const Appointments = () => {
  // States
  const [viewMode, setViewMode] = useState('calendar'); // calendar | list
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample data
  const appointments = [
    {
      id: 1,
      clientName: 'زهرا احمدی',
      clientPhone: '09123456789',
      service: 'کراتینه مو',
      staff: 'سارا احمدی',
      date: '1403/03/15',
      time: '09:00',
      duration: 120,
      price: 2500000,
      status: 'confirmed',
      notes: 'مراجعه دوم برای کراتینه',
      avatar: '👩‍🦰',
      rating: 5
    },
    {
      id: 2,
      clientName: 'مریم حسینی',
      clientPhone: '09987654321',
      service: 'رنگ مو + کوتاهی',
      staff: 'نگار محمدی',
      date: '1403/03/15',
      time: '11:30',
      duration: 180,
      price: 1800000,
      status: 'pending',
      notes: 'رنگ طبیعی درخواستی',
      avatar: '👩‍🦱',
      rating: 4
    },
    {
      id: 3,
      clientName: 'فاطمه کریمی',
      clientPhone: '09112233445',
      service: 'میکاپ عروس',
      staff: 'شیدا رضایی',
      date: '1403/03/15',
      time: '14:00',
      duration: 240,
      price: 5000000,
      status: 'completed',
      notes: 'میکاپ مراسم عقد',
      avatar: '👸',
      rating: 5
    },
    {
      id: 4,
      clientName: 'سمیرا عباسی',
      clientPhone: '09334455667',
      service: 'ماساژ صورت',
      staff: 'مریم جوادی',
      date: '1403/03/15',
      time: '16:30',
      duration: 90,
      price: 1200000,
      status: 'cancelled',
      notes: 'کنسل شده توسط مشتری',
      avatar: '👩',
      rating: 3
    }
  ];

  const staffMembers = [
    { id: 1, name: 'سارا احمدی', services: ['کراتینه', 'بوتاکس مو'] },
    { id: 2, name: 'نگار محمدی', services: ['رنگ مو', 'کوتاهی'] },
    { id: 3, name: 'شیدا رضایی', services: ['میکاپ', 'آرایش'] },
    { id: 4, name: 'مریم جوادی', services: ['ماساژ', 'پاکسازی'] }
  ];

  const services = [
    { id: 1, name: 'کراتینه مو', duration: 120, price: 2500000 },
    { id: 2, name: 'رنگ مو', duration: 90, price: 1500000 },
    { id: 3, name: 'کوتاهی مو', duration: 45, price: 800000 },
    { id: 4, name: 'میکاپ عروس', duration: 240, price: 5000000 },
    { id: 5, name: 'ماساژ صورت', duration: 90, price: 1200000 }
  ];

  // Utility functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle2 className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <Star className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'تأیید شده';
      case 'pending': return 'در انتظار';
      case 'completed': return 'انجام شده';
      case 'cancelled': return 'کنسل شده';
      default: return 'نامشخص';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  const formatTime = (time) => {
    return time;
  };

  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter(app => {
      const matchesSearch = app.clientName.includes(searchQuery) || 
                           app.service.includes(searchQuery) ||
                           app.staff.includes(searchQuery);
      const matchesStatus = filteredStatus === 'all' || app.status === filteredStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch(sortBy) {
        case 'time':
          aValue = a.time;
          bValue = b.time;
          break;
        case 'client':
          aValue = a.clientName;
          bValue = b.clientName;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        default:
          aValue = a.time;
          bValue = b.time;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Calendar view component
  const CalendarView = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-32"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = appointments.filter(app => {
        const appDate = new Date(app.date);
        return appDate.getDate() === day && 
               appDate.getMonth() === currentMonth && 
               appDate.getFullYear() === currentYear;
      });
      
      days.push(
        <div
          key={day}
          className="h-32 border border-gray-200 p-2 hover:bg-purple-50 transition-all duration-300 cursor-pointer relative overflow-hidden group"
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
        >
          <div className="text-sm font-bold text-gray-700 mb-1">{day}</div>
          <div className="space-y-1">
            {dayAppointments.slice(0, 3).map(app => (
              <div
                key={app.id}
                className={`text-xs p-1 rounded text-center ${getStatusColor(app.status)} hover:scale-105 transition-transform duration-200`}
              >
                {app.time} - {app.clientName}
              </div>
            ))}
            {dayAppointments.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayAppointments.length - 3} مورد دیگر
              </div>
            )}
          </div>
          {dayAppointments.length > 0 && (
            <Sparkles className="absolute top-1 left-1 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
          )}
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-100">
        {/* Calendar Header */}
        <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-3xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h2 className="text-2xl font-bold flex items-center">
                <CalendarIcon className="w-8 h-8 ml-3 animate-pulse" />
                تقویم نوبت‌ها
                <Wand2 className="w-6 h-6 mr-3 animate-spin" style={{ animationDuration: '3s' }} />
              </h2>
              <div className="text-purple-100">
                {new Intl.DateTimeFormat('fa-IR', { month: 'long', year: 'numeric' }).format(today)}
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-300">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-300">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map(day => (
            <div key={day} className="p-4 text-center font-bold text-gray-600 border-l border-gray-200 last:border-l-0">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    );
  };

  // List view component
  const ListView = () => (
    <div className="bg-white rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <List className="w-8 h-8 ml-3 animate-pulse" />
          لیست نوبت‌ها
          <Heart className="w-6 h-6 mr-3 animate-pulse" />
        </h2>
      </div>
      
      {/* Appointments List */}
      <div className="divide-y divide-gray-100">
        {filteredAppointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className="p-6 hover:bg-purple-50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              {/* Main Info */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-3xl group-hover:animate-bounce">
                  {appointment.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">
                    {appointment.clientName}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <Phone className="w-4 h-4 ml-2" />
                    {appointment.clientPhone}
                  </p>
                </div>
              </div>
              
              {/* Service & Staff */}
              <div className="text-center">
                <p className="font-semibold text-gray-800">{appointment.service}</p>
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <User className="w-4 h-4 ml-1" />
                  {appointment.staff}
                </p>
              </div>
              
              {/* Time & Duration */}
              <div className="text-center">
                <p className="font-bold text-purple-600 text-lg">{appointment.time}</p>
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <Clock className="w-4 h-4 ml-1" />
                  {appointment.duration} دقیقه
                </p>
              </div>
              
              {/* Price */}
              <div className="text-center">
                <p className="font-bold text-green-600 text-lg">
                  {formatCurrency(appointment.price)}
                </p>
                <div className="flex items-center justify-center text-yellow-500">
                  {[...Array(appointment.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Status */}
              <div className="text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)} group-hover:scale-105 transition-transform duration-300`}>
                  {getStatusIcon(appointment.status)}
                  <span className="mr-1">{getStatusText(appointment.status)}</span>
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowDetailModal(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowEditModal(true);
                  }}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('آیا از حذف این نوبت اطمینان دارید؟')) {
                      // Handle delete
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Floating sparkle effect */}
            <Sparkles className="absolute top-2 right-2 w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-purple-500/50">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center">
                  <Calendar className="w-10 h-10 ml-4 animate-pulse" />
                  مدیریت نوبت‌ها
                  <Smile className="w-8 h-8 mr-4 animate-bounce" />
                </h1>
                <p className="text-purple-100 text-lg">
                  مدیریت کامل نوبت‌های آرایشگاه شما ✨
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-center">
                  <div className="text-3xl font-bold">{appointments.length}</div>
                  <div className="text-purple-100 text-sm">کل نوبت‌ها</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </div>
                  <div className="text-purple-100 text-sm">تأیید شده</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <Wand2 className="absolute top-4 right-8 w-8 h-8 text-white/30 animate-spin" style={{ animationDuration: '4s' }} />
          <Heart className="absolute bottom-4 left-8 w-6 h-6 text-white/40 animate-pulse" />
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 bg-white rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجوی نوبت‌ها... 🔍"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-purple-50/50 hover:bg-purple-50 placeholder-gray-500"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <select
              value={filteredStatus}
              onChange={(e) => setFilteredStatus(e.target.value)}
              className="px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white hover:bg-purple-50"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="confirmed">تأیید شده</option>
              <option value="pending">در انتظار</option>
              <option value="completed">انجام شده</option>
              <option value="cancelled">کنسل شده</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white hover:bg-purple-50"
            >
              <option value="time">مرتب‌سازی بر اساس زمان</option>
              <option value="client">مرتب‌سازی بر اساس مشتری</option>
              <option value="price">مرتب‌سازی بر اساس قیمت</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all duration-300 hover:scale-110"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
            </button>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'calendar' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 space-x-reverse hover:scale-105 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-bold">نوبت جدید</span>
            <Zap className="w-4 h-4 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'calendar' ? <CalendarView /> : <ListView />}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center">
                  <Plus className="w-8 h-8 ml-3 animate-pulse" />
                  افزودن نوبت جدید
                  <Sparkles className="w-6 h-6 mr-3 animate-spin" />
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-300"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Info */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نام مشتری *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="نام مشتری را وارد کنید"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">شماره تماس *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="09123456789"
                  />
                </div>
                
                {/* Service */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">خدمات *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300">
                    <option value="">انتخاب خدمات</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {formatCurrency(service.price)}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Staff */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">متخصص *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300">
                    <option value="">انتخاب متخصص</option>
                    {staffMembers.map(staff => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">تاریخ *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                {/* Time */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ساعت *</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">یادداشت</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="یادداشت‌های اضافی..."
                ></textarea>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-100 flex justify-end space-x-4 space-x-reverse bg-gray-50 rounded-b-3xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  // Handle save
                  setShowAddModal(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold flex items-center space-x-2 space-x-reverse hover:scale-105"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>ذخیره</span>
                <Zap className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure to Add Modal */}
      {showEditModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-3xl text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center">
                  <Edit3 className="w-8 h-8 ml-3 animate-pulse" />
                  ویرایش نوبت
                  <Wand2 className="w-6 h-6 mr-3 animate-spin" />
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-300"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Pre-filled form similar to add modal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نام مشتری</label>
                  <input
                    type="text"
                    defaultValue={selectedAppointment.clientName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    defaultValue={selectedAppointment.clientPhone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">وضعیت</label>
                  <select 
                    defaultValue={selectedAppointment.status}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="pending">در انتظار</option>
                    <option value="confirmed">تأیید شده</option>
                    <option value="completed">انجام شده</option>
                    <option value="cancelled">کنسل شده</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">یادداشت</label>
                <textarea
                  rows={3}
                  defaultValue={selectedAppointment.notes}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="p-8 border-t border-gray-100 flex justify-end space-x-4 space-x-reverse bg-gray-50 rounded-b-3xl">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  // Handle update
                  setShowEditModal(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold flex items-center space-x-2 space-x-reverse hover:scale-105"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>به‌روزرسانی</span>
                <Heart className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-3xl text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center">
                  <Eye className="w-8 h-8 ml-3 animate-pulse" />
                  جزئیات نوبت
                  <Smile className="w-6 h-6 mr-3 animate-bounce" />
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-300"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Client Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <User className="w-6 h-6 ml-2" />
                    اطلاعات مشتری
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center">
                      <span className="text-3xl ml-3">{selectedAppointment.avatar}</span>
                      <div>
                        <p className="font-bold text-gray-800">{selectedAppointment.clientName}</p>
                        <p className="text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 ml-1" />
                          {selectedAppointment.clientPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-gray-700 ml-2">امتیاز:</span>
                      {[...Array(selectedAppointment.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Service Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Settings className="w-6 h-6 ml-2" />
                    اطلاعات خدمات
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">خدمات</p>
                      <p className="font-bold text-gray-800">{selectedAppointment.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">متخصص</p>
                      <p className="font-bold text-gray-800">{selectedAppointment.staff}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">مدت زمان</p>
                        <p className="font-bold text-gray-800">{selectedAppointment.duration} دقیقه</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-600">قیمت</p>
                        <p className="font-bold text-green-600">{formatCurrency(selectedAppointment.price)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Schedule Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Calendar className="w-6 h-6 ml-2" />
                    زمان‌بندی
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">تاریخ</p>
                      <p className="font-bold text-gray-800">{selectedAppointment.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ساعت</p>
                      <p className="font-bold text-gray-800">{selectedAppointment.time}</p>
                    </div>
                  </div>
                </div>
                
                {/* Status & Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Activity className="w-6 h-6 ml-2" />
                    وضعیت و یادداشت
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">وضعیت</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAppointment.status)}`}>
                        {getStatusIcon(selectedAppointment.status)}
                        <span className="mr-1">{getStatusText(selectedAppointment.status)}</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">یادداشت</p>
                      <p className="text-gray-800">{selectedAppointment.notes || 'بدون یادداشت'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-t border-gray-100 flex justify-end space-x-4 space-x-reverse bg-gray-50 rounded-b-3xl">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold"
              >
                بستن
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setShowEditModal(true);
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold flex items-center space-x-2 space-x-reverse hover:scale-105"
              >
                <Edit3 className="w-5 h-5" />
                <span>ویرایش</span>
                <Zap className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
