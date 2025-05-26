'use client';

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600">
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              پنل مدیریت آرایشگاه آرایا
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              مدیریت هوشمند نوبت‌دهی و مشتریان
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Customer Management */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">مدیریت مشتریان</h2>
            <p className="text-gray-600 mb-6">افزودن و مدیریت اطلاعات مشتریان</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              مشتری جدید
            </button>
          </div>

          {/* Appointment Management */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">مدیریت نوبت‌ها</h2>
            <p className="text-gray-600 mb-6">رزرو و مدیریت نوبت‌های روزانه</p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              نوبت جدید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
