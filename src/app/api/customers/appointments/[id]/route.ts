import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import Customer from '@/models/Customer';
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
        { success: false, error: 'شناسه نوبت معتبر نیست' },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findById(id)
      .populate('customerId', 'name phone email birthDate address');
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'نوبت یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment
    });

  } catch (error) {
    console.error('خطا در دریافت نوبت:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت اطلاعات نوبت' },
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
        { success: false, error: 'شناسه نوبت معتبر نیست' },
        { status: 400 }
      );
    }

    // دریافت نوبت فعلی
    const currentAppointment = await Appointment.findById(id);
    if (!currentAppointment) {
      return NextResponse.json(
        { success: false, error: 'نوبت یافت نشد' },
        { status: 404 }
      );
    }

    // اگر تاریخ یا زمان تغییر کرده، بررسی تداخل
    if (body.date || body.time || body.duration) {
      const newDate = body.date ? new Date(body.date) : currentAppointment.date;
      const newTime = body.time || currentAppointment.time;
      const newDuration = body.duration || currentAppointment.duration;

      const [hours, minutes] = newTime.split(':').map(Number);
      const startTime = new Date(newDate);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + newDuration);

      // جستجوی نوبت‌های موجود (به جز نوبت فعلی)
      const conflictingAppointments = await Appointment.find({
        _id: { $ne: id },
        date: {
          $gte: new Date(newDate.setHours(0, 0, 0, 0)),
          $lt: new Date(newDate.setHours(23, 59, 59, 999))
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
    }

    // بروزرسانی نوبت
    const updatedData = { ...body };
    
    // محاسبه مجدد مبلغ نهایی در صورت تغییر قیمت یا تخفیف
    if (body.price !== undefined || body.discount !== undefined) {
      const price = body.price !== undefined ? body.price : currentAppointment.price;
      const discount = body.discount !== undefined ? body.discount : currentAppointment.discount;
      updatedData.finalAmount = price - (price * discount / 100);
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { ...updatedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('customerId', 'name phone email');

    // اگر وضعیت به completed تغییر کرد، آمار مشتری را بروزرسانی کن
    if (body.status === 'completed' && currentAppointment.status !== 'completed') {
      await Customer.findByIdAndUpdate(currentAppointment.customerId, {
        $inc: { 
          totalSpent: appointment.finalAmount,
          totalVisits: currentAppointment.status === 'pending' || currentAppointment.status === 'confirmed' ? 0 : 1
        },
        lastVisit: new Date()
      });
    }

    return NextResponse.json({
      success: true,
      data: appointment,
      message: 'نوبت با موفقیت بروزرسانی شد'
    });

  } catch (error: any) {
    console.error('خطا در بروزرسانی نوبت:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'خطا در بروزرسانی نوبت' },
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
        { success: false, error: 'شناسه نوبت معتبر نیست' },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'نوبت یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'نوبت با موفقیت حذف شد'
    });

  } catch (error) {
    console.error('خطا در حذف نوبت:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در حذف نوبت' },
      { status: 500 }
    );
  }
}
