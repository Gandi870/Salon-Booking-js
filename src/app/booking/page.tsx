'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  category: string;
}

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  selectedServices: string[];
  notes: string;
}

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    selectedServices: [],
    notes: ''
  });

  const [selectedServiceDetails, setSelectedServiceDetails] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 'haircut',
      name: 'کوتاهی مو',
      price: 150000,
      duration: 60,
      description: 'کوتاهی و مدل دادن موی سر با جدیدترین تکنیک‌ها',
      category: 'مو'
    },
    {
      id: 'coloring',
      name: 'رنگ مو',
      price: 300000,
      duration: 120,
      description: 'رنگ کردن مو با بهترین مواد اولیه',
      category: 'مو'
    },
    {
      id: 'facial',
      name: 'پاکسازی پوست',
      price: 200000,
      duration: 90,
      description: 'پاکسازی عمیق پوست صورت',
      category: 'پوست'
    },
    {
      id: 'manicure',
      name: 'مانیکور',
      price: 100000,
      duration: 45,
      description: 'مراقبت و زیبایی ناخن‌های دست',
      category: 'ناخن'
    },
    {
      id: 'pedicure',
      name: 'پدیکور',
      price: 120000,
      duration: 60,
      description: 'مراقبت و زیبایی ناخن‌های پا',
      category: 'ناخن'
    },
    {
      id: 'makeup',
      name: 'آرایش',
      price: 250000,
      duration: 75,
      description: 'آرایش حرفه‌ای برای مناسبات خاص',
      category: 'آرایش'
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleServiceClick = (service: Service) => {
    setSelectedServiceDetails(service);
  };

  const calculateTotal = () => {
    return formData.selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateTotalDuration = () => {
    return formData.selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.duration || 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.selectedServices.length === 0) {
      alert('لطفاً حداقل یک خدمت انتخاب کنید');
      return;
    }

    // اینجا می‌تونی درخواست API بفرستی
    console.log('Form submitted:', formData);
    alert('نوبت شما با موفقیت رزرو شد!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <PageLayout 
      title="📋 رزرو نوبت"
      description="نوبت خود را در سالن زیبایی رویایی رزرو کنید"
    >
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* اطلاعات شخصی */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              👤 اطلاعات شخصی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره تلفن *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="09123456789"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل (اختیاری)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* انتخاب خدمات */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              💼 انتخاب خدمات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.selectedServices.includes(service.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <input
                      type="checkbox"
                      checked={formData.selectedServices.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                      className="w-5 h-5 text-purple-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.category}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-purple-600 font-medium">
                      {formatPrice(service.price)}
                    </span>
                    <span className="text-gray-500">
                      {service.duration} دقیقه
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* خلاصه خدمات انتخاب شده */}
            {formData.selectedServices.length > 0 && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">خدمات انتخاب شده:</h3>
                <div className="space-y-1">
                  {formData.selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex justify-between text-sm">
                        <span>{service.name}</span>
                        <span>{formatPrice(service.price)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="border-t border-purple-200 mt-2 pt-2 flex justify-between font-semibold">
                  <span>مجموع:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  زمان تقریبی: {calculateTotalDuration()} دقیقه
                </div>
              </div>
            )}
          </div>

          {/* انتخاب تاریخ و زمان */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📅 انتخاب تاریخ و زمان
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  زمان *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">انتخاب کنید</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* یادداشت */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📝 یادداشت
            </h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="در صورت داشتن نکته خاص، اینجا بنویسید..."
            />
          </div>

          {/* دکمه ارسال */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
            >
              🎯 تایید رزرو
            </button>
          </div>
        </form>

        {/* جزئیات خدمت */}
        {selectedServiceDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedServiceDetails.name}
                </h3>
                <button
                  onClick={() => setSelectedServiceDetails(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">{selectedServiceDetails.description}</p>
                <div className="flex justify-between">
                  <span className="font-medium">دسته‌بندی:</span>
                  <span>{selectedServiceDetails.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">قیمت:</span>
                  <span className="text-purple-600 font-semibold">
                    {formatPrice(selectedServiceDetails.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">مدت زمان:</span>
                  <span>{selectedServiceDetails.duration} دقیقه</span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleServiceChange(selectedServiceDetails.id);
                  setSelectedServiceDetails(null);
                }}
                className={`w-full mt-4 py-2 rounded-lg font-medium ${
                  formData.selectedServices.includes(selectedServiceDetails.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                {formData.selectedServices.includes(selectedServiceDetails.id)
                  ? 'حذف از لیست'
                  : 'افزودن به لیست'
                }
              </button>
            </div>
          </div>
        )}

        {/* اطلاعات تماس */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📞 اطلاعات تماس
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <p className="font-medium">تلفن</p>
              <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📍</div>
              <p className="font-medium">آدرس</p>
              <p className="text-gray-600">تهران، ولیعصر، پلاک ۱۲۳</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🕐</div>
              <p className="font-medium">ساعات کاری</p>
              <p className="text-gray-600">۹:۰۰ تا ۲۱:۰۰</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingPage;
