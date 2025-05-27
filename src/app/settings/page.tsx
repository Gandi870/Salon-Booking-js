'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  preferences: {
    notifications: boolean;
    smsReminders: boolean;
    emailOffers: boolean;
    preferredTime: string;
  };
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [profile, setProfile] = useState<UserProfile>({
    name: 'زهرا احمدی',
    phone: '09123456789',
    email: 'zahra@example.com',
    birthday: '1995-05-15',
    address: 'تهران، منطقه 3، خیابان کریمخان',
    preferences: {
      notifications: true,
      smsReminders: true,
      emailOffers: false,
      preferredTime: 'morning'
    }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', name: 'اطلاعات شخصی', icon: '👤' },
    { id: 'preferences', name: 'تنظیمات', icon: '⚙️' },
    { id: 'security', name: 'امنیت', icon: '🔒' },
    { id: 'history', name: 'تاریخچه', icon: '📋' }
  ];

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // اینجا API call برای ذخیره اطلاعات
    alert('اطلاعات با موفقیت ذخیره شد!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('رمز عبور جدید و تایید آن یکسان نیست!');
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert('رمز عبور باید حداقل 6 کاراکتر باشد!');
      return;
    }

    // اینجا API call برای تغییر رمز
    alert('رمز عبور با موفقیت تغییر کرد!');
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // داده‌های نمونه برای تاریخچه
  const appointmentHistory = [
    {
      id: 1,
      date: '1403/02/15',
      services: ['کوتاهی مو', 'رنگ مو'],
      status: 'تکمیل شده',
      total: 450000
    },
    {
      id: 2,
      date: '1403/01/28',
      services: ['پاکسازی پوست'],
      status: 'تکمیل شده',
      total: 200000
    },
    {
      id: 3,
      date: '1403/03/10',
      services: ['مانیکور', 'پدیکور'],
      status: 'لغو شده',
      total: 220000
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ تولد
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={profile.birthday}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                آدرس
              </label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                ذخیره تغییرات
              </button>
            </div>
          </form>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">اطلاع‌رسانی</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">دریافت اعلان‌ها</span>
                  <input
                    type="checkbox"
                    checked={profile.preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-gray-700">یادآوری پیامکی</span>
                  <input
                    type="checkbox"
                    checked={profile.preferences.smsReminders}
                    onChange={(e) => handlePreferenceChange('smsReminders', e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-gray-700">دریافت تخفیف‌ها از طریق ایمیل</span>
                  <input
                    type="checkbox"
                    checked={profile.preferences.emailOffers}
                    onChange={(e) => handlePreferenceChange('emailOffers', e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">تنظیمات رزرو</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  زمان ترجیحی رزرو
                </label>
                <select
                  value={profile.preferences.preferredTime}
                  onChange={(e) => handlePreferenceChange('preferredTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="morning">صبح (9-12)</option>
                  <option value="afternoon">بعدازظهر (12-17)</option>
                  <option value="evening">عصر (17-21)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                ذخیره تنظیمات
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <form onSubmit={handleChangePassword} className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">تغییر رمز عبور</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز عبور فعلی
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز عبور جدید
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تایید رمز عبور جدید
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  تغییر رمز عبور
                </button>
              </div>
            </form>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">حذف حساب کاربری</h3>
              <p className="text-red-700 text-sm mb-3">
                با حذف حساب کاربری، تمام اطلاعات شما به طور کامل پاک خواهد شد.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                حذف حساب
              </button>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">تاریخچه نوبت‌ها</h3>
            {appointmentHistory.map((appointment) => (
              <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">
                      {appointment.date}
                    </div>
                    <div className="text-sm text-gray-600">
                      {appointment.services.join(' - ')}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      appointment.status === 'تکمیل شده' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatPrice(appointment.total)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {appointmentHistory.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-gray-600">هنوز نوبتی رزرو نکرده‌اید</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout 
      title="⚙️ تنظیمات"
      description="مدیریت حساب کاربری و تنظیمات شخصی"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
