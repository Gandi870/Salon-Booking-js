import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  customerId: mongoose.Types.ObjectId;
  customerName: string;
  customerPhone: string;
  service: string;
  price: number;
  date: Date;
  time: string;
  duration: number; // به دقیقه
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentMethod?: 'cash' | 'card' | 'transfer';
  discount?: number;
  finalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    match: [/^09[0-9]{9}$/, 'شماره تلفن معتبر نیست']
  },
  service: {
    type: String,
    required: [true, 'نوع خدمت الزامی است'],
    enum: {
      values: [
        'کوتاهی مو', 'رنگ مو', 'فیشال', 'کراتین مو', 'هایلایت', 
        'ماساژ صورت', 'ابرو', 'پاکسازی پوست', 'لایه‌بندی مو', 'رفلکس مو'
      ],
      message: 'نوع خدمت انتخابی معتبر نیست'
    }
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'قیمت نمی‌تواند منفی باشد']
  },
  date: {
    type: Date,
    required: [true, 'تاریخ نوبت الزامی است']
  },
  time: {
    type: String,
    required: [true, 'زمان نوبت الزامی است'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'فرمت زمان معتبر نیست']
  },
  duration: {
    type: Number,
    required: true,
    min: [15, 'حداقل مدت زمان 15 دقیقه است'],
    max: [480, 'حداکثر مدت زمان 8 ساعت است']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'یادداشت نمی‌تواند بیش از 500 کاراکتر باشد']
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'transfer']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'تخفیف نمی‌تواند منفی باشد'],
    max: [100, 'تخفیف نمی‌تواند بیش از 100 درصد باشد']
  },
  finalAmount: {
    type: Number,
    required: true,
    min: [0, 'مبلغ نهایی نمی‌تواند منفی باشد']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ایندکس‌ها
AppointmentSchema.index({ customerId: 1, date: -1 });
AppointmentSchema.index({ date: 1, time: 1 });
AppointmentSchema.index({ status: 1, date: 1 });
AppointmentSchema.index({ customerPhone: 1 });

// ایندکس کامپوزیت برای جلوگیری از نوبت‌های تکراری
AppointmentSchema.index({ date: 1, time: 1 }, { 
  unique: true,
  partialFilterExpression: { 
    status: { $in: ['pending', 'confirmed'] } 
  }
});

// Pre-save middleware برای محاسبه مبلغ نهایی
AppointmentSchema.pre('save', function(next) {
  if (this.discount && this.discount > 0) {
    this.finalAmount = this.price - (this.price * this.discount / 100);
  } else {
    this.finalAmount = this.price;
  }
  next();
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
