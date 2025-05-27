import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description?: string;
  price: number;
  duration: number; // به دقیقه
  category: string;
  isActive: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
  name: {
    type: String,
    required: [true, 'نام خدمت الزامی است'],
    unique: true,
    trim: true,
    maxlength: [100, 'نام خدمت نمی‌تواند بیش از 100 کاراکتر باشد']
  },
  description: {
    type: String,
    maxlength: [500, 'توضیحات نمی‌تواند بیش از 500 کاراکتر باشد']
  },
  price: {
    type: Number,
    required: [true, 'قیمت خدمت الزامی است'],
    min: [0, 'قیمت نمی‌تواند منفی باشد']
  },
  duration: {
    type: Number,
    required: [true, 'مدت زمان خدمت الزامی است'],
    min: [15, 'حداقل مدت زمان 15 دقیقه است'],
    max: [480, 'حداکثر مدت زمان 8 ساعت است']
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['مو', 'پوست', 'زیبایی', 'ماساژ', 'ناخن'],
      message: 'دسته‌بندی معتبر نیست'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

// ایندکس‌ها
ServiceSchema.index({ name: 1 });
ServiceSchema.index({ category: 1, isActive: 1 });
ServiceSchema.index({ price: 1 });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
