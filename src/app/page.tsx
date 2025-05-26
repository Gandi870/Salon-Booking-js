'use client';

import Container from '@/components/ui/Container';
import HeroSection from '@/components/dashboard/HeroSection';
import StatsCards from '@/components/dashboard/StatsCards';
import QuickActions from '@/components/dashboard/QuickActions';

export default function Home() {
  const handleNewCustomer = () => {
    console.log('افزودن مشتری جدید');
    // TODO: باز کردن مودال یا صفحه افزودن مشتری
  };

  const handleNewAppointment = () => {
    console.log('افزودن نوبت جدید');
    // TODO: باز کردن مودال یا صفحه افزودن نوبت
  };

  return (
    <Container maxWidth="xl" className="space-y-8">
      {/* Hero Section */}
      <HeroSection 
        onNewCustomer={handleNewCustomer}
        onNewAppointment={handleNewAppointment}
      />

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          📈 فعالیت‌های اخیر
        </h2>
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg">این بخش بعداً اضافه خواهد شد</p>
        </div>
      </div>
    </Container>
  );
}
