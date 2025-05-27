'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface ReportData {
  dailyRevenue: { date: string; amount: number; appointments: number }[];
  monthlyRevenue: { month: string; amount: number; appointments: number }[];
  serviceStats: { service: string; count: number; revenue: number }[];
  customerStats: { totalCustomers: number; newCustomers: number; returningCustomers: number };
  topCustomers: { name: string; visits: number; totalSpent: number }[];
}

const ReportsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'appointments' | 'services'>('revenue');

  useEffect(() => {
    setMounted(true);
  }, []);

  // داده‌های نمونه
  const [reportData] = useState<ReportData>({
    dailyRevenue: [
      { date: '1403/03/15', amount: 850000, appointments: 5 },
      { date: '1403/03/16', amount: 1200000, appointments: 7 },
      { date: '1403/03/17', amount: 950000, appointments: 6 },
      { date: '1403/03/18', amount: 1400000, appointments: 8 },
      { date: '1403/03/19', amount: 1100000, appointments: 6 },
      { date: '1403/03/20', amount: 1600000, appointments: 9 },
      { date: '1403/03/21', amount: 1300000, appointments: 7 }
    ],
    monthlyRevenue: [
      { month: 'فروردین', amount: 25000000, appointments: 150 },
      { month: 'اردیبهشت', amount: 28000000, appointments: 165 },
      { month: 'خرداد', amount: 32000000, appointments: 180 },
      { month: 'تیر', amount: 35000000, appointments: 195 },
      { month: 'مرداد', amount: 30000000, appointments: 170 },
      { month: 'شهریور', amount: 38000000, appointments: 210 }
    ],
    serviceStats: [
      { service: 'کوتاهی مو', count: 45, revenue: 9000000 },
      { service: 'رنگ مو', count: 32, revenue: 12800000 },
      { service: 'فیشال', count: 28, revenue: 8400000 },
      { service: 'کراتین مو', count: 15, revenue: 12000000 },
      { service: 'هایلایت', count: 22, revenue: 8800000 },
      { service: 'ماساژ صورت', count: 35, revenue: 5250000 },
      { service: 'ابرو', count: 50, revenue: 2500000 },
      { service: 'پاکسازی پوست', count: 18, revenue: 5400000 }
    ],
    customerStats: {
      totalCustomers: 245,
      newCustomers: 38,
      returningCustomers: 207
    },
    topCustomers: [
      { name: 'مریم احمدی', visits: 12, totalSpent: 2400000 },
      { name: 'سارا محمدی', visits: 10, totalSpent: 2100000 },
      { name: 'فاطمه رضایی', visits: 8, totalSpent: 1800000 },
      { name: 'زهرا کریمی', visits: 9, totalSpent: 1650000 },
      { name: 'نرگس حسینی', visits: 7, totalSpent: 1500000 }
    ]
  });

  if (!mounted) {
    return null;
  }

  // محاسبه آمار کلی
  const totalRevenue = reportData.dailyRevenue.reduce((sum, day) => sum + day.amount, 0);
  const totalAppointments = reportData.dailyRevenue.reduce((sum, day) => sum + day.appointments, 0);
  const averagePerAppointment = totalRevenue / totalAppointments;
  const bestDay = reportData.dailyRevenue.reduce((best, day) => 
    day.amount > best.amount ? day : best
  );

  // رنگ‌های نمودار
  const chartColors = [
    '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', 
    '#EF4444', '#EC4899', '#6366F1', '#84CC16'
  ];

  const SimpleBarChart = ({ data, type }: { data: any[], type: 'revenue' | 'appointments' }) => {
    const maxValue = Math.max(...data.map(item => type === 'revenue' ? item.amount : item.appointments));
    
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-20 text-sm text-gray-600 text-right">
              {item.date || item.month}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div 
                className="bg-purple-600 h-6 rounded-full flex items-center justify-end pr-2"
                style={{ 
                  width: `${((type === 'revenue' ? item.amount : item.appointments) / maxValue) * 100}%` 
                }}
              >
                <span className="text-white text-xs font-medium">
                  {type === 'revenue' 
                    ? `${(item.amount / 1000000).toFixed(1)}M`
                    : item.appointments
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ServicesPieChart = () => {
    const total = reportData.serviceStats.reduce((sum, service) => sum + service.revenue, 0);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* نمودار دایره‌ای ساده */}
        <div className="space-y-3">
          {reportData.serviceStats.map((service, index) => {
            const percentage = (service.revenue / total) * 100;
            return (
              <div key={service.service} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: chartColors[index % chartColors.length] }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{service.service}</span>
                    <span className="text-sm text-gray-600">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {service.count} نوبت • {(service.revenue / 1000000).toFixed(1)}M تومان
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* نمودار میله‌ای خدمات */}
        <div className="space-y-2">
          {reportData.serviceStats.map((service, index) => {
            const maxRevenue = Math.max(...reportData.serviceStats.map(s => s.revenue));
            const percentage = (service.revenue / maxRevenue) * 100;
            
            return (
              <div key={service.service} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{service.service}</span>
                  <span className="font-medium">{(service.revenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: chartColors[index % chartColors.length]
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <PageLayout 
      title="📊 گزارش‌ها و آمار"
      description="مشاهده آمار فروش، نوبت‌ها و عملکرد کسب‌وکار"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* آمار کلی */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-gray-600">درآمد هفته</div>
            <div className="text-sm text-green-600 mt-1">+12% نسبت به هفته قبل</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalAppointments}</div>
            <div className="text-gray-600">نوبت‌های هفته</div>
            <div className="text-sm text-green-600 mt-1">+8% نسبت به هفته قبل</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {(averagePerAppointment / 1000).toFixed(0)}K
            </div>
            <div className="text-gray-600">میانگین هر نوبت</div>
            <div className="text-sm text-green-600 mt-1">+5% نسبت به هفته قبل</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {reportData.customerStats.newCustomers}
            </div>
            <div className="text-gray-600">مشتری جدید</div>
            <div className="text-sm text-green-600 mt-1">+15% نسبت به هفته قبل</div>
          </div>
        </div>

        {/* کنترل‌های نمودار */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">نمودار عملکرد</h3>
            
            <div className="flex gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedChart('revenue')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === 'revenue'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  درآمد
                </button>
                <button
                  onClick={() => setSelectedChart('appointments')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === 'appointments'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  نوبت‌ها
                </button>
                <button
                  onClick={() => setSelectedChart('services')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === 'services'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  خدمات
                </button>
              </div>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="week">هفته اخیر</option>
                <option value="month">ماه اخیر</option>
                <option value="year">سال اخیر</option>
              </select>
            </div>
          </div>
        </div>

        {/* نمودارها */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {selectedChart === 'revenue' && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">درآمد روزانه</h4>
              <SimpleBarChart data={reportData.dailyRevenue} type="revenue" />
            </div>
          )}

          {selectedChart === 'appointments' && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">تعداد نوبت‌های روزانه</h4>
              <SimpleBarChart data={reportData.dailyRevenue} type="appointments" />
            </div>
          )}

          {selectedChart === 'services' && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">آمار خدمات</h4>
              <ServicesPieChart />
            </div>
          )}
        </div>

        {/* جدول بهترین مشتریان و آمار تفصیلی */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* بهترین مشتریان */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 بهترین مشتریان</h3>
            <div className="space-y-3">
              {reportData.topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.visits} مراجعه</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">
                      {(customer.totalSpent / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-gray-500">تومان</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* آمار مشتریان */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 آمار مشتریان</h3>
            <div className="space-y-4">
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-blue-900">کل مشتریان</div>
                  <div className="text-sm text-blue-700">تعداد کل مشتریان ثبت شده</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {reportData.customerStats.totalCustomers}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-900">مشتریان جدید</div>
                  <div className="text-sm text-green-700">این ماه</div>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {reportData.customerStats.newCustomers}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-purple-900">مشتریان برگشتی</div>
                  <div className="text-sm text-purple-700">مراجعه مجدد</div>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {reportData.customerStats.returningCustomers}
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">نرخ بازگشت مشتریان</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                    style={{ 
                      width: `${(reportData.customerStats.returningCustomers / reportData.customerStats.totalCustomers) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="text-right text-sm font-medium text-gray-900 mt-1">
                  {((reportData.customerStats.returningCustomers / reportData.customerStats.totalCustomers) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* خلاصه عملکرد */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 خلاصه عملکرد</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium text-gray-900">بهترین روز</div>
              <div className="text-sm text-gray-600">{bestDay.date}</div>
              <div className="text-lg font-bold text-purple-600 mt-1">
                {(bestDay.amount / 1000000).toFixed(1)}M تومان
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-medium text-gray-900">محبوب‌ترین خدمت</div>
              <div className="text-sm text-gray-600">
                {reportData.serviceStats.reduce((best, service) => 
                  service.count > best.count ? service : best
                ).service}
              </div>
              <div className="text-lg font-bold text-green-600 mt-1">
                {reportData.serviceStats.reduce((best, service) => 
                  service.count > best.count ? service : best
                ).count} نوبت
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-medium text-gray-900">پردرآمدترین خدمت</div>
              <div className="text-sm text-gray-600">
                {reportData.serviceStats.reduce((best, service) => 
                  service.revenue > best.revenue ? service : best
                ).service}
              </div>
              <div className="text-lg font-bold text-orange-600 mt-1">
                {(reportData.serviceStats.reduce((best, service) => 
                  service.revenue > best.revenue ? service : best
                ).revenue / 1000000).toFixed(1)}M تومان
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">عملیات گزارش</h3>
            
            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                📊 صادرات Excel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                📄 صادرات PDF
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                📧 ارسال ایمیل
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportsPage;
