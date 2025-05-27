// src/components/dashboard/RecentAppointments.tsx
'use client';

import React, { useState } from 'react';
import {
  Clock,
  User,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  Edit,
  Trash2,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';
import Card from '../ui/Card';

interface RecentAppointmentsProps {
  darkMode: boolean;
}

interface Appointment {
  id: number;
  customer: string;
  service: string;
  time: string;
  date: string;
  phone: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  rating?: number;
  price: string;
  avatar: string;
}

const RecentAppointments: React.FC<RecentAppointmentsProps> = ({ darkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments: Appointment[] = [
    {
      id: 1,
      customer: 'مریم احمدی',
      service: 'کراتین مو',
      time: '09:00',
      date: '۱۴۰۳/۰۳/۰۵',
      phone: '09123456789',
      status: 'confirmed',
      rating: 5,
      price: '450,000',
      avatar: '👩‍🦱'
    
    {
      id: 2,
      customer: 'زهرا رضایی',
      service: 'رنگ مو',
      time: '11:30',
      date: '۱۴۰۳/۰۳/۰۵',
      phone: '09123456788',
      status: 'pending',
      price: '320,000',
      avatar: '�‍🦰'
    }
    {
      id: 3,
      customer: 'فاطمه کریمی',
      service: 'کوتاهی مو',
      time: '14:00',
      date: '۱۴۰۳/۰۳/۰۵',
      phone: '09123456787',
      status: 'completed',
      rating: 4,
      price: '180,000',
      avatar: '👩💼'
    }
    {
      id: 4,
      customer: 'سارا محمدی',
      service: 'پکیج کامل',
      time: '16:30',
      date: '۱۴۰۳/۰۳/۰۵',
      phone: '09123456786',
      status: 'cancelled',
      price: '680,000',
      avatar: '�‍💻'
    
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'from-blue-500 to-blue-600';
      case 'pending':
        return 'from-yellow-500 to-orange-500';
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'cancelled':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return CheckCircle;
      case 'pending':
        return AlertCircle;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'تأیید شده';
      case 'pending':
        return 'در انتظار';
      case 'completed':
        return 'انجام شده';
      case 'cancelled':
        return 'لغو شده';
      default:
        return 'نامشخص';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = selectedFilter === 'all' || appointment.status === selectedFilter;
    const matchesSearch = appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Card
      className={`p-6 mb-6 sm:mb-8 ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/80 border-white/50'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="mr-3">
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              آخرین نوبت‌ها
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              مدیریت نوبت‌های امروز
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-3 space-x-reverse w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48 transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Filter */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <option value="all">همه</option>
            <option value="confirmed">تأیید شده</option>
            <option value="pending">در انتظار</option>
            <option value="completed">انجام شده</option>
            <option value="cancelled">لغو شده</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment, index) => {
          const StatusIcon = getStatusIcon(appointment.status);
          
          return (
            <div
              key={appointment.id}
              className={`
                p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl group
                ${darkMode 
                  ? 'bg-gray-700/50 border-gray-600/50 hover:border-gray-500' 
                  : 'bg-gray-50/50 border-gray-200/50 hover:border-purple-300'
                }
                animate-in slide-in-from-right-1/2 duration-300
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                {/* Customer Info */}
                <div className="flex items-center space-x-4 space-x-reverse flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
                    {appointment.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <h3 className={`font-bold text-lg ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {appointment.customer}
                      </h3>
                      {appointment.rating && (
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className={`text-sm font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {appointment.rating}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 sm:space-x-reverse text-sm">
                      <span className={`flex items-center ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4 ml-1" />
                        {appointment.time}
                      </span>
                      <span className={`flex items-center ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Phone className="w-4 h-4 ml-1" />
                        {appointment.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service & Status */}
                <div className="flex flex-col sm:items-end space-y-2 w-full sm:w-auto">
                  <div className="flex items-center justify-between sm:justify-end w-full space-x-3 space-x-reverse">
                    <div className="text-right">
                      <p className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {appointment.service}
                      </p>
                      <p className={`text-lg font-bold ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {appointment.price.toLocaleString()} تومان
                      </p>
                    </div>
                    
                    <div className={`
                      px-3 py-2 rounded-xl text-white text-sm font-bold flex items-center space-x-2 space-x-reverse
                      bg-gradient-to-r ${getStatusColor(appointment.status)} shadow-lg
                    `}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{getStatusText(appointment.status)}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className={`
                      p-2 rounded-lg transition-all duration-300 hover:scale-110
                      ${darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600'
                      } text-white
                    `}>
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button className={`
                      p-2 rounded-lg transition-all duration-300 hover:scale-110
                      ${darkMode 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-red-500 hover:bg-red-600'
                      } text-white
                    `}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <button className={`
                      p-2 rounded-lg transition-all duration-300 hover:scale-110
                      ${darkMode 
                        ? 'bg-gray-600 hover:bg-gray-700' 
                        : 'bg-gray-400 hover:bg-gray-500'
                      } text-white
                    `}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className={`w-16 h-16 mx-auto mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={`text-lg font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            نوبتی یافت نشد
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            فیلتر یا جستجوی خود را تغییر دهید
          </p>
        </div>
      )}
    </Card>
  );
};

export default RecentAppointments;
