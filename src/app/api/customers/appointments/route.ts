import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import Customer from '@/models/Customer';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const date = searchParams.get('date');
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // ساخت کوئری
    const query: any = {};
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    if (status) {
      query.status = status;
    }
    
    if (customerId && mongoose.Types.ObjectId.isValid(customerId)) {
      query.customerId = customerId;
    }

    // محاسبه offset
    const skip = (page - 1) * limit;

    // ساخت sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    if (sortBy !== 'time') {
      sort.time = 1; // همیشه بر اساس زمان هم مرتب کن
    }

    // اجرای کوئری با populate
    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .populate('customerId', 'name phone email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Appointment.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        appointments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('خطا در دریافت نوبت‌ها:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت نوبت‌ها' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      customerId, 
      customerName, 
      customerPhone, 
      service, 
      price, 
      date, 
      time, 
      duration, 
      notes,
      discount = 0
    } = body;

    // اعتبارسنجی ورودی
    if (!customerId || !service || !price || !date || !time || !duration) {
      return NextResponse.json(
        { success: false, error: 'تمام فیلدهای الزامی باید پر شوند' },
        { status: 400 }
      );
    }

    // بررسی وجود مشتری
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'مشتری یافت نشد' },
        { status: 404 }
      );
    }

    // بررسی تداخل زمانی
    const appointmentDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    const startTime = new Date(appointmentDate);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + duration);

    // جستجوی نوبت‌های موجود در همان روز
    const conflictingAppointments = await Appointment.find({
      date: {
        $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
        $lt: new Date(appointmentDate.setHours(23, 59, 59, 999))
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    // بررسی تداخل
    for (const apt of conflictingAppointments) {
      const [aptHours, aptMinutes] = apt.time.split(':').map(Number);
      const aptStart = new Date(apt.date);
      aptStart.setHours(aptHours, aptMinutes, 0, 0);
      
      const aptEnd = new Date(aptStart);
      aptEnd.setMinutes(aptEnd.getMinutes() + apt.duration);

      if (
        (startTime >= aptStart && startTime < aptEnd) ||
        (endTime > aptStart && endTime <= aptEnd) ||
        (startTime <= aptStart && endTime >= aptEnd)
      ) {
        return NextResponse.json(
          { success: false, error: 'در این زمان نوبت دیگری وجود دارد' },
          { status: 409 }
        );
      }
    }

    // محاسبه مبلغ نهایی
    const finalAmount = price - (price * discount / 100);

    // ایجاد نوبت جدید
    const appointment = new Appointment({
      customerId,
      customerName: customerName || customer.name,
      customerPhone: customerPhone || customer.phone,
      service,
      price,
      date: appointmentDate,
      time,
      duration,
      notes,
      discount,
      finalAmount
    });

    await appointment.save();

    // بروزرسانی آمار مشتری
    await Customer.findByIdAndUpdate(customerId, {
      $inc: { totalVisits: 1 },
      lastVisit: new Date()
    });

    // populate کردن اطلاعات مشتری برای response
    await appointment.populate('customerId', 'name phone email');

    return NextResponse.json({
      success: true,
      data: appointment,
      message: 'نوبت با موفقیت ثبت شد'
    }, { status: 201 });

  } catch (error: any) {
    console.error('خطا در ایجاد نوبت:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'خطا در ثبت نوبت' },
      { status: 500 }
    );
  }
}
