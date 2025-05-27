import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // ساخت کوئری جستجو
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // محاسبه offset
    const skip = (page - 1) * limit;

    // ساخت sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // اجرای کوئری
    const [customers, total] = await Promise.all([
      Customer.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Customer.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        customers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('خطا در دریافت مشتریان:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت اطلاعات مشتریان' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, phone, email, birthDate, address, notes } = body;

    // اعتبارسنجی ورودی
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'نام و شماره تلفن الزامی هستند' },
        { status: 400 }
      );
    }

    // بررسی تکراری نبودن شماره تلفن
    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: 'مشتری با این شماره تلفن قبلاً ثبت شده است' },
        { status: 409 }
      );
    }

    // ایجاد مشتری جدید
    const customer = new Customer({
      name,
      phone,
      email,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      address,
      notes
    });

    await customer.save();

    return NextResponse.json({
      success: true,
      data: customer,
      message: 'مشتری با موفقیت ثبت شد'
    }, { status: 201 });

  } catch (error: any) {
    console.error('خطا در ایجاد مشتری:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'خطا در ثبت مشتری' },
      { status: 500 }
    );
  }
}
