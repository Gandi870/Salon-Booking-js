import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import Customer from '@/models/Customer';
import Appointment from '@/models/Appointment';

const services = [
  {
    name: 'کوتاهی مو',
    description: 'کوتاهی و اصلاح مو با جدیدترین تکنیک‌ها',
    price: 150000,
    duration: 60,
    category: 'مو'
  },
  {
    name: 'رنگ مو',
    description: 'رنگ مو با رنگ‌های طبیعی و مقاوم',
    price: 300000,
    duration: 120,
    category: 'مو'
  },
  {
    name: 'فیشال',
    description: 'پاکسازی عمیق و مراقبت از پوست صورت',
    price: 200000,
    duration: 90,
    category: 'پوست'
  },
  {
    name: 'کراتین مو',
    description: 'صاف کردن و تقویت مو با کراتین',
    price: 500000,
    duration: 180,
    category: 'مو'
  },
  {
    name: 'هایلایت',
    description: 'هایلایت مو با تکنیک‌های مدرن',
    price: 250000,
    duration: 150,
    category: 'مو'
  },
  {
    name: 'ماساژ صورت',
    description: 'ماساژ آرامش‌بخش صورت و گردن',
    price: 120000,
    duration: 45,
    category: 'زیبایی'
  },
  {
    name: 'ابرو',
    description: 'اصلاح و طراحی ابرو',
    price: 80000,
    duration: 30,
    category: 'زیبایی'
  },
  {
    name: 'پاکسازی پوست',
    description: 'پاکسازی عمیق پوست با دستگاه‌های مدرن',
    price: 180000,
    duration: 75,
    category: 'پوست'
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('🔗 اتصال به دیتابیس برقرار شد');

    // پاک کردن داده‌های قبلی
    await Service.deleteMany({});
    console.log('🗑️ خدمات قبلی پاک شدند');

    // اضافه کردن خدمات
    await Service.insertMany(services);
    console.log('✅ خدمات با موفقیت اضافه شدند');

    // اضافه کردن چند مشتری نمونه
    const sampleCustomers = [
      {
        name: 'مریم احمدی',
        phone: '09123456789',
        email: 'maryam@example.com',
        birthDate: new Date('1990-05-15'),
        address: 'تهران، خیابان ولیعصر'
      },
      {
        name: 'فاطمه رضایی',
        phone: '09123456788',
        email: 'fateme@example.com',
        birthDate: new Date('1985-08-20'),
        address: 'تهران، خیابان انقلاب'
      },
      {
        name: 'زهرا محمدی',
        phone: '09123456787',
        birthDate: new Date('1992-12-10'),
        address: 'تهران، خیابان کریمخان'
      }
    ];

    await Customer.deleteMany({});
    const customers = await Customer.insertMany(sampleCustomers);
    console.log('✅ مشتریان نمونه اضافه شدند');

    console.log('🎉 دیتابیس با موفقیت اولیه‌سازی شد!');
    process.exit(0);

  } catch (error) {
    console.error('❌ خطا در اولیه‌سازی دیتابیس:', error);
    process.exit(1);
  }
}

// اجرای اسکریپت
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
