'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface Message {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'reminder' | 'offer' | 'system';
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

const MessagesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      title: 'یادآوری نوبت',
      content: 'نوبت شما برای فردا ساعت 14:00 برای خدمات کوتاهی مو و رنگ مو تنظیم شده است. لطفاً 15 دقیقه زودتر حضور یابید.',
      date: '1403/03/15',
      type: 'reminder',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'تخفیف ویژه 20%',
      content: 'به مناسبت روز زن، تخفیف 20% برای تمام خدمات پوست و آرایش! این تخفیف تا پایان هفته اعتبار دارد.',
      date: '1403/03/12',
      type: 'offer',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'تایید رزرو نوبت',
      content: 'نوبت شما برای تاریخ 1403/03/16 ساعت 14:00 برای خدمت پاکسازی پوست با موفقیت ثبت شد.',
      date: '1403/03/10',
      type: 'info',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'خدمات جدید!',
      content: 'خوشحالیم که اعلام کنیم خدمات هیدرافیشیال و ضد پیری به لیست خدمات ما اضافه شده است. برای کسب اطلاعات بیشتر تماس بگیرید.',
      date: '1403/03/08',
      type: 'info',
      isRead: true,
      priority: 'low'
    },
    {
      id: 5,
      title: 'بروزرسانی سیستم',
      content: 'سیستم رزرو آنلاین ما بروزرسانی شده و امکانات جدیدی اضافه شده است. اکنون می‌توانید نوبت‌هایتان را آسان‌تر مدیریت کنید.',
      date: '1403/03/05',
      type: 'system',
      isRead: false,
      priority: 'low'
    },
    {
      id: 6,
      title: 'تغییر ساعات کاری',
      content: 'اطلاع می‌رسانیم که به دلیل تعطیلات عید، ساعات کاری سالن در هفته آینده از 10:00 تا 18:00 خواهد بود.',
      date: '1403/03/01',
      type: 'info',
      isRead: true,
      priority: 'high'
    }
  ]);

  const filters = [
    { id: 'all', name: 'همه پیام‌ها', count: messages.length },
    { id: 'unread', name: 'خوانده نشده', count: messages.filter(m => !m.isRead).length },
    { id: 'reminder', name: 'یادآوری‌ها', count: messages.filter(m => m.type === 'reminder').length },
    { id: 'offer', name: 'تخفیف‌ها', count: messages.filter(m => m.type === 'offer').length },
    { id: 'info', name: 'اطلاعیه‌ها', count: messages.filter(m => m.type === 'info').length }
  ];

  const getFilteredMessages = () => {
    switch (selectedFilter) {
      case 'unread':
        return messages.filter(m => !m.isRead);
      case 'reminder':
        return messages.filter(m => m.type === 'reminder');
      case 'offer':
        return messages.filter(m => m.type === 'offer');
      case 'info':
        return messages.filter(m => m.type === 'info');
      default:
        return messages;
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'offer': return '🎁';
      case 'info': return 'ℹ️';
      case 'system': return '⚙️';
      default: return '📧';
    }
  };

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case 'reminder': return 'یادآوری';
      case 'offer': return 'تخفیف';
      case 'info': return 'اطلاعیه';
      case 'system': return 'سیستم';
      default: return 'پیام';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const markAllAsRead = () => {
    setMessages(prev => 
      prev.map(msg => ({ ...msg, isRead: true }))
    );
  };

  const deleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    setSelectedMessage(null);
  };

  const handleMessageClick = (message: Message) => {
    if (!message.isRead) {
      markAsRead(message.id);
    }
    setSelectedMessage(message);
  };

  const filteredMessages = getFilteredMessages();

  return (
    <PageLayout 
      title="💬 پیام‌ها"
      description="پیام‌ها و اطلاع‌رسانی‌های سالن زیبایی"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* فیلترها */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                <span>{filter.name}</span>
                {filter.count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedFilter === filter.id 
                      ? 'bg-white text-purple-600' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* دکمه خواندن همه */}
          {messages.some(m => !m.isRead) && (
            <button
              onClick={markAllAsRead}
              className="text-purple-600 hover:text-purple-700 text-sm"
            >
              علامت‌گذاری همه به عنوان خوانده شده
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* لیست پیام‌ها */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">
                  پیام‌ها ({filteredMessages.length})
                </h2>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          !message.isRead ? 'bg-purple-50' : ''
                        } ${selectedMessage?.id === message.id ? 'bg-purple-100' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">
                            {getMessageIcon(message.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium truncate ${
                                !message.isRead ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {message.title}
                              </h3>
                              {!message.isRead && (
                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {message.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {message.date}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(message.priority)}`}>
                                  {getMessageTypeLabel(message.type)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-gray-600">پیامی یافت نشد</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* جزئیات پیام */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg h-fit">
              {selectedMessage ? (
                <div>
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {getMessageIcon(selectedMessage.type)}
                        </span>
                        <h3 className="font-semibold text-gray-900">
                          {selectedMessage.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{selectedMessage.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedMessage.priority)}`}>
                        {getMessageTypeLabel(selectedMessage.type)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedMessage.content}
                    </p>
                  </div>
                  
                  {selectedMessage.type === 'reminder' && (
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        مشاهده جزئیات نوبت
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">📧</div>
                  <p className="text-gray-600">پیامی انتخاب کنید</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            📞 در صورت نیاز به پاسخ سریع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <p className="font-medium">تلفن</p>
              <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">💬</div>
              <p className="font-medium">پیام مستقیم</p>
              <p className="text-gray-600">در همین بخش پیام بدهید</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🕐</div>
              <p className="font-medium">ساعات پاسخگویی</p>
              <p className="text-gray-600">۹:۰۰ تا ۲۱:۰۰</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MessagesPage;
