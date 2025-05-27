'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('faq');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const tabs = [
    { id: 'faq', name: 'سوالات متداول', icon: '❓' },
    { id: 'contact', name: 'تماس با ما', icon: '📞' },
    { id: 'guide', name: 'راهنمای استفاده', icon: '📖' },
    { id: 'policies', name: 'قوانین و مقررات', icon: '📋' }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'چگونه نوبت رزرو کنم؟',
      answer: 'برای رزرو نوبت می‌توانید از بخش "رزرو نوبت" در صفحه اصلی استفاده کنید. ابتدا خدمات مورد نظر را انتخاب کرده، سپس تاریخ و زمان دلخواهتان را تعیین کنید و در نهایت اطلاعات تماس خود را وارد نمایید.',
      category: 'booking'
    },
    {
      id: 2,
      question: 'آیا می‌توانم نوبتم را لغو یا تغییر دهم؟',
      answer: 'بله، می‌توانید تا 24 ساعت قبل از موعد نوبت، آن را لغو یا تغییر دهید. برای این کار با شماره تلفن سالن تماس بگیرید یا از بخش پیام‌ها درخواست خود را ارسال کنید.',
      category: 'booking'
    },
    {
      id: 3,
      question: 'روش‌های پرداخت چیست؟',
      answer: 'پرداخت در سالن صورت می‌گیرد و می‌توانید نقدی، با کارت یا از طریق کیف پول دیجیتال پرداخت کنید. امکان پرداخت اقساطی برای خدمات بالای 500 هزار تومان وجود دارد.',
      category: 'payment'
    },
    {
      id: 4,
      question: 'ساعات کاری سالن چیست؟',
      answer: 'سالن زیبایی رویایی از شنبه تا پنج‌شنبه از ساعت 9:00 تا 21:00 فعال است. روزهای جمعه و تعطیلات رسمی تعطیل می‌باشیم.',
      category: 'general'
    },
    {
      id: 5,
      question: 'آیا برای مراجعه اول مشاوره رایگان دارید؟',
      answer: 'بله، برای تمام مشتریان جدید مشاوره رایگان ارائه می‌دهیم. در این جلسه متخصصان ما بهترین خدمات را بر اساس نوع پوست و موی شما پیشنهاد می‌دهند.',
      category: 'services'
    },
    {
      id: 6,
      question: 'چه مدارکی برای احراز هویت لازم است؟',
      answer: 'فقط کافی است کارت ملی یا شناسنامه همراه داشته باشید. برای خدمات خاص مانند لیزر، تست حساسیت انجام می‌شود.',
      category: 'general'
    },
    {
      id: 7,
      question: 'آیا برای خدمات گارانتی وجود دارد؟',
      answer: 'بله، برای تمام خدمات ما گارانتی کیفیت ارائه می‌دهیم. مدت گارانتی بسته به نوع خدمت متفاوت است که در زمان ارائه خدمت اطلاع‌رسانی می‌شود.',
      category: 'services'
    },
    {
      id: 8,
      question: 'آیا امکان رزرو گروهی وجود دارد؟',
      answer: 'بله، برای مناسبات خاص مانند عروسی یا جشن تولد امکان رزرو گروهی با تخفیف ویژه وجود دارد. حداقل 3 نفر و حداکثر 10 نفر.',
      category: 'booking'
    }
  ];

  const categories = [
    { id: 'all', name: 'همه موضوعات', count: faqs.length },
    { id: 'booking', name: 'رزرو نوبت', count: faqs.filter(f => f.category === 'booking').length },
    { id: 'services', name: 'خدمات', count: faqs.filter(f => f.category === 'services').length },
    { id: 'payment', name: 'پرداخت', count: faqs.filter(f => f.category === 'payment').length },
    { id: 'general', name: 'عمومی', count: faqs.filter(f => f.category === 'general').length }
  ];

  const guideSteps = [
    {
      step: 1,
      title: 'ثبت نام / ورود',
      description: 'اول از همه باید وارد حساب کاربری خود شوید یا ثبت نام کنید.',
      icon: '👤'
    },
    {
      step: 2,
      title: 'انتخاب خدمات',
      description: 'از صفحه خدمات، سرویس‌های مورد نظر خود را انتخاب کنید.',
      icon: '💼'
    },
    {
      step: 3,
      title: 'رزرو نوبت',
      description: 'تاریخ و زمان مناسب را انتخاب کرده و نوبت خود را رزرو کنید.',
      icon: '📅'
    },
    {
      step: 4,
      title: 'تایید نهایی',
      description: 'پس از تایید، پیام تاییدیه برای شما ارسال خواهد شد.',
      icon: '✅'
    },
    {
      step: 5,
      title: 'حضور در سالن',
      description: 'در تاریخ و زمان تعیین شده در سالن حضور یابید.',
      icon: '🏢'
    }
  ];

  const policies = [
    {
      title: 'قوانین رزرو نوبت',
      items: [
        'حداقل 24 ساعت قبل از موعد نوبت باید حضور یابید',
        'در صورت تاخیر بیش از 15 دقیقه، نوبت لغو خواهد شد',
        'تغییر یا لغو نوبت باید 24 ساعت قبل اطلاع داده شود',
        'در صورت عدم حضور بدون اطلاع قبلی، جریمه اعمال می‌شود'
      ]
    },
    {
      title: 'قوانین پرداخت',
      items: [
        'پرداخت پس از ارائه خدمت صورت می‌گیرد',
        'امکان پرداخت نقدی، کارتی و دیجیتال وجود دارد',
        'برای خدمات بالای 500 هزار تومان امکان اقساط وجود دارد',
        'بازگشت وجه در صورت لغو تا 24 ساعت قبل امکان‌پذیر است'
      ]
    },
    {
      title: 'قوانین عمومی سالن',
      items: [
        'رعایت آرامش و احترام به سایر مشتریان الزامی است',
        'استفاده از تلفن همراه در محیط سالن ممنوع است',
        'همراه داشتن کارت شناسایی الزامی است',
        'کودکان زیر 12 سال باید با والدین همراه باشند'
      ]
    }
  ];

  const getFilteredFAQs = () => {
    let filtered = faqs;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // اینجا API call برای ارسال پیام
    alert('پیام شما با موفقیت ارسال شد. تا 24 ساعت آینده پاسخ داده خواهد شد.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <div className="space-y-6">
            {/* جستجو و فیلتر */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در سوالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id 
                        ? 'bg-white text-purple-600' 
                        : 'bg-white text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* لیست سوالات */}
            <div className="space-y-3">
              {getFilteredFAQs().map((faq) => (
                <div key={faq.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      <span className={`transform transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}>
                        ⌄
                      </span>
                    </div>
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-3 text-gray-600 border-t border-gray-100">
                      <p className="mt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}

              {getFilteredFAQs().length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-600">سوالی یافت نشد</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* فرم تماس */}
            <div>
              <form onSubmit={handleContactFormSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ارسال پیام</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      تلفن
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    موضوع *
                  </label>
                  <select
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="booking">مشکل در رزرو نوبت</option>
                    <option value="service">سوال درباره خدمات</option>
                    <option value="payment">مشکل پرداخت</option>
                    <option value="complaint">شکایت</option>
                    <option value="suggestion">پیشنهاد</option>
                    <option value="other">سایر موارد</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    پیام *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="پیام خود را اینجا بنویسید..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  ارسال پیام
                </button>
              </form>
            </div>

            {/* اطلاعات تماس */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">راه‌های تماس</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">📱</div>
                  <div>
                    <p className="font-medium text-gray-900">تلفن</p>
                    <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p className="text-sm text-gray-500">پاسخگویی: ۹:۰۰ تا ۲۱:۰۰</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="font-medium text-gray-900">ایمیل</p>
                    <p className="text-gray-600">info@royalbeauty.ir</p>
                    <p className="text-sm text-gray-500">پاسخ تا 24 ساعت</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="font-medium text-gray-900">آدرس</p>
                    <p className="text-gray-600">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                    <p className="text-sm text-gray-500">طبقه دوم، واحد 5</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">💬</div>
                  <div>
                    <p className="font-medium text-gray-900">پیام مستقیم</p>
                    <p className="text-gray-600">از بخش پیام‌ها</p>
                    <p className="text-sm text-gray-500">پاسخ فوری</p>
                  </div>
                </div>
              </div>

              {/* ساعات کاری */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">ساعات کاری</h4>
                <div className="space-y-1 text-sm text-purple-700">
                  <p>شنبه تا پنج‌شنبه: ۹:۰۰ - ۲۱:۰۰</p>
                  <p>جمعه: تعطیل</p>
                  <p>تعطیلات رسمی: تعطیل</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'guide':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                راهنمای استفاده از سیستم
              </h3>
              <p className="text-gray-600">
                مراحل استفاده از سیستم رزرو آنلاین را دنبال کنید
              </p>
            </div>

            <div className="space-y-6">
              {guideSteps.map((step, index) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{step.icon}</span>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                    {index < guideSteps.length - 1 && (
                      <div className="w-px h-6 bg-gray-300 ml-6 mt-4"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* نکات مهم */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                💡 نکات مهم
              </h4>
              <ul className="space-y-2 text-blue-800">
                <li>• حتماً شماره تلفن صحیح وارد کنید تا پیام تایید دریافت کنید</li>
                <li>• 15 دقیقه زودتر از موعد نوبت حضور یابید</li>
                <li>• برای تغییر یا لغو نوبت حداقل 24 ساعت قبل اطلاع دهید</li>
                <li>• کارت شناسایی معتبر همراه داشته باشید</li>
              </ul>
            </div>
          </div>
        );

      case 'policies':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                قوانین و مقررات سالن
              </h3>
              <p className="text-gray-600">
                لطفاً قوانین زیر را مطالعه کرده و رعایت نمایید
              </p>
            </div>

            <div className="space-y-6">
              {policies.map((policy, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">{policy.title}</h4>
                  <ul className="space-y-2">
                    {policy.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* توافقنامه */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-3">⚠️ توجه</h4>
              <p className="text-yellow-800">
                با استفاده از خدمات سالن زیبایی رویایی، شما موافقت خود را با تمام قوانین و مقررات فوق اعلام می‌کنید. 
                در صورت نقض هر یک از این قوانین، سالن حق اتخاذ تصمیمات لازم را محفوظ می‌دارد.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout 
      title="❓ مرکز کمک"
      description="راهنما، سوالات متداول و پشتیبانی"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Tab Navigation */}
        <div className="mb-8">
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
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderTabContent()}
        </div>

        {/* پیوندهای سریع */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-900 mb-1">رزرو سریع</h3>
            <p className="text-sm text-gray-600 mb-3">نوبت خود را همین الان رزرو کنید</p>
            <button
              onClick={() => window.location.href = '/booking'}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              رزرو نوبت
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">💼</div>
            <h3 className="font-semibold text-gray-900 mb-1">مشاهده خدمات</h3>
            <p className="text-sm text-gray-600 mb-3">لیست کامل خدمات و قیمت‌ها</p>
            <button
              onClick={() => window.location.href = '/services'}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              مشاهده خدمات
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-gray-900 mb-1">پیام‌ها</h3>
            <p className="text-sm text-gray-600 mb-3">مشاهده پیام‌ها و اطلاعیه‌ها</p>
            <button
              onClick={() => window.location.href = '/messages'}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              مشاهده پیام‌ها
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HelpPage;
