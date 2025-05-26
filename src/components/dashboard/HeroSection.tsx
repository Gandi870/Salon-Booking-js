'use client';

import React from 'react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  onNewCustomer?: () => void;
  onNewAppointment?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "🌟 به پنل مدیریت آرایشگاه آرایا خوش آمدید",
  subtitle = "مدیریت حرفه‌ای مشتریان و نوبت‌دهی",
  onNewCustomer,
  onNewAppointment
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white rounded-xl shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Content */}
      <div className="relative py-16 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <button 
            onClick={onNewCustomer}
            className="group bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">➕</span>
            مشتری جدید
          </button>
          <button 
            onClick={onNewAppointment}
            className="group bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📅</span>
            نوبت جدید
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
