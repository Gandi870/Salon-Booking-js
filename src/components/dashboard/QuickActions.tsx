'use client';

import React from 'react';

interface ActionButtonProps {
  icon: string;
  title: string;
  bgColor: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions?: ActionButtonProps[];
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, title, bgColor, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`p-6 text-center ${bgColor} rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg transform group border border-gray-100`}
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
        {title}
      </div>
    </button>
  );
};

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const defaultActions: ActionButtonProps[] = [
    {
      icon: '👤',
      title: 'مشتری جدید',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      onClick: () => console.log('Add new customer')
    },
    {
      icon: '📅',
      title: 'نوبت جدید',
      bgColor: 'bg-green-50 hover:bg-green-100',
      onClick: () => console.log('Add new appointment')
    },
    {
      icon: '✂️',
      title: 'خدمت جدید',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      onClick: () => console.log('Add new service')
    },
    {
      icon: '📊',
      title: 'گزارشات',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      onClick: () => console.log('View reports')
    },
    {
      icon: '💳',
      title: 'پرداخت‌ها',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      onClick: () => console.log('View payments')
    },
    {
      icon: '⚙️',
      title: 'تنظیمات',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      onClick: () => console.log('Settings')
    },
    {
      icon: '📱',
      title: 'پیامک',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
      onClick: () => console.log('Send SMS')
    },
    {
      icon: '🎁',
      title: 'تخفیف‌ها',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      onClick: () => console.log('Manage discounts')
    }
  ];

  const actionsToShow = actions || defaultActions;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          ⚡ عملیات سریع
        </h2>
        <div className="text-sm text-gray-500">
          {actionsToShow.length} عملیات
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {actionsToShow.map((action, index) => (
          <ActionButton key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
