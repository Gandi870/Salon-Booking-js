import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email?: string;
  birthDate?: Date;
  address?: string;
  notes?: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: [true, 'نام مشتری الزامی است'],
    trim: true,
    maxlength: [100, 'نام نمی‌تواند بیش از 100 کاراکتر باشد']
  },
  phone: {
    type: String,
    required: [true, 'شماره تلفن الزامی است'],
    unique: true,
    match: [/^09[0-9]{9}$/, 'شماره تلفن معتبر نیست']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'ایمیل معتبر نیست']
  },
  birthDate: {
    type: Date
  },
  address: {
    type: String,
    maxlength: [500, 'آدرس نمی‌تواند بیش از 500 کاراکتر باشد']
  },
  notes: {
    type: String,
    maxlength: [1000, 'یادداشت نمی‌تواند بیش از 1000 کاراکتر باشد']
  },
  totalVisits: {
    type: Number,
    default: 0,
    min: 0
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  lastVisit: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ایندکس‌ها برای جستجوی بهتر
CustomerSchema.index({ phone: 1 });
CustomerSchema.index({ name: 'text', phone: 'text' });
CustomerSchema.index({ createdAt: -1 });

// Virtual برای محاسبه سن
CustomerSchema.virtual('age').get(function() {
  if (!this.birthDate) return null;
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

export default mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
