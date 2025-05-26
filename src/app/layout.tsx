import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "آرایشگاه آرایا - مدیریت مشتریان",
  description: "سیستم مدیریت مشتریان و نوبت‌دهی آرایشگاه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    💇‍♀️ آرایشگاه آرایا
                  </h1>
                </div>
                <nav className="flex space-x-8 space-x-reverse">
                  <a href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                    خانه
                  </a>
                  <a href="/customers" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                    مشتریان
                  </a>
                  <a href="/appointments" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                    نوبت‌ها
                  </a>
                  <a href="/services" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                    خدمات
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                © 1403 آرایشگاه آرایا - تمامی حقوق محفوظ است
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
