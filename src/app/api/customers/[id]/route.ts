import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Appointment from '@/models/Appointment';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'شناسه مشتری معتبر نیست' },
        { status: 400 }
      );
    }

    const customer = await Customer.findById(id);
    
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'مشتری یافت نشد' },
        { status: 404 }
      );
    }

    // دریافت تاریخچه نوبت‌های مشتری
    const appointments = await Appointment.find({ customerId: id })
      .sort({ date: -1 })
      .limit(10);

    return NextResponse.json({
      success: true,
      data: {
        customer,
        appointments
      }
    });

  } catch (error) {
    console.error('خطا در دریافت مشتری:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت اطلاعات مشتری' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'شناسه مشتری معتبر نیست' },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'مشتری یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: customer,
      message: 'اطلاعات مشتری با موفقیت بروزرسانی شد'
    });

  } catch (error: any) {
    console.error('خطا در بروزرسانی مشتری:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'خطا در بروزرسانی اطلاعات مشتری' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'شناسه مشتری معتبر نیست' },
        { status: 400 }
      );
    }

    // بررسی وجود نوبت‌های فعال
    const activeAppointments = await Appointment.countDocuments({
      customerId: id,
      status: { $in: ['pending', 'confirmed'] },
      date: { $gte: new Date() }
    });

    if (activeAppointments > 0) {
      return NextResponse.json(
        { success: false, error: 'نمی‌توان مشتری با نوبت‌های فعال را حذف کرد' },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndDelete(id);
    
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'مشتری یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'مشتری با موفقیت حذف شد'
    });

  } catch (error) {
    console.error('خطا در حذف مشتری:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در حذف مشتری' },
      { status: 500 }
    );
  }
}
