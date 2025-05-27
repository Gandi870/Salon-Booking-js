'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* بخش چپ: لوگو و نام - همیشه ثابت */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="text-2xl">💄</div>
            <h1 className="text-xl font-bold text-gray-900">
              سالن زیبایی رویایی
            </h1>
          </div>

          {/* بخش راست: دکمه بازگشت - همیشه در سمت راست */}
          <div className="flex items-center justify-end min-w-[140px]">
            {!isHomePage && (
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span>🏠</span>
                <span>بازگشت به خانه</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
