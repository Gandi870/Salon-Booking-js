import React from 'react';

interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsCardsProps {
  stats?: StatCardProps[];
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-4 ${bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="mr-4">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div className={`flex items-center mt-1 text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="ml-1">
                  {trend.isPositive ? '↗️' : '↘️'}
                </span>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const defaultStats: StatCardProps[] = [
    {
      icon: '👥',
      title: 'تعداد مشتریان',
      value: '125',
      bgColor: 'bg-blue-100',
      trend: { value: 12, isPositive: true }
    },
    {
      icon: '📅',
      title: 'نوبت‌های امروز', 
      value: '8',
      bgColor: 'bg-green-100',
      trend: { value: 5, isPositive: true }
    },
    {
      icon: '💰',
      title: 'درآمد امروز',
      value: '2.5M',
      bgColor: 'bg-purple-100',
      trend: { value: 8, isPositive: true }
    },
    {
      icon: '⭐',
      title: 'رضایت مشتریان',
      value: '4.8',
      bgColor: 'bg-yellow-100',
      trend: { value: 2, isPositive: true }
    }
  ];

  const statsToShow = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsToShow.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
