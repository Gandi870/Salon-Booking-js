import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');

    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }

    const services = await Service.find(query)
      .sort({ category: 1, name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: services
    });

  } catch (error) {
    console.error('خطا در دریافت خدمات:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت خدمات' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, description, price, duration, category, image } = body;

    if (!name || !price || !duration || !category) {
      return NextResponse.json(
        { success: false, error: 'نام، قیمت، مدت زمان و دسته‌بندی الزامی هستند' },
        { status: 400 }
      );
    }

    const service = new Service({
      name,
      description,
      price,
      duration,
      category,
      image
    });

    await service.save();

    return NextResponse.json({
      success: true,
      data: service,
      message: 'خدمت با موفقیت ثبت شد'
    }, { status: 201 });

  } catch (error: any) {
    console.error('خطا در ایجاد خدمت:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'خدمت با این نام قبلاً ثبت شده است' },
        { status: 409 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'خطا در ثبت خدمت' },
      { status: 500 }
    );
  }
}

