import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import Customer from '@/models/Customer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month'; // day, week, month, year
    
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // آمار کلی
    const [
      totalCustomers,
      newCustomers,
      totalAppointments,
      completedAppointments,
      pendingAppointments,
      cancelledAppointments,
      totalRevenue,
      averageServicePrice
    ] = await Promise.all([
      Customer.countDocuments(),
      Customer.countDocuments({ createdAt: { $gte: startDate } }),
      Appointment.countDocuments({ date: { $gte: startDate } }),
      Appointment.countDocuments({ 
        date: { $gte: startDate }, 
        status: 'completed' 
      }),
      Appointment.countDocuments({ 
        date: { $gte: startDate }, 
        status: { $in: ['pending', 'confirmed'] } 
      }),
      Appointment.countDocuments({ 
        date: { $gte: startDate }, 
        status: 'cancelled' 
      }),
      Appointment.aggregate([
        { 
          $match: { 
            date: { $gte: startDate }, 
            status: 'completed' 
          } 
        },
        { 
          $group: { 
            _id: null, 
            total: { $sum: '$finalAmount' } 
          } 
        }
      ]).then(result => result[0]?.total || 0),
      Appointment.aggregate([
        { 
          $match: { 
            date: { $gte: startDate }, 
            status: 'completed' 
          } 
        },
        { 
          $group: { 
            _id: null, 
            average: { $avg: '$finalAmount' } 
          } 
        }
      ]).then(result => Math.round(result[0]?.average || 0))
    ]);

    // آمار خدمات محبوب
    const popularServices = await Appointment.aggregate([
      { 
        $match: { 
          date: { $gte: startDate }, 
          status: 'completed' 
        } 
      },
      { 
        $group: { 
          _id: '$service', 
          count: { $sum: 1 },
          revenue: { $sum: '$finalAmount' }
        } 
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // آمار روزانه درآمد (برای نمودار)
    const dailyRevenue = await Appointment.aggregate([
      { 
        $match: { 
          date: { $gte: startDate }, 
          status: 'completed' 
        } 
      },
      { 
        $group: { 
          _id: { 
            $dateToString: { 
              format: '%Y-%m-%d', 
              date: '$date' 
            } 
          }, 
          revenue: { $sum: '$finalAmount' },
          appointments: { $sum: 1 }
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    // آمار ماهانه (برای نمودار سالانه)
    const monthlyStats = await Appointment.aggregate([
      { 
        $match: { 
          date: { $gte: new Date(now.getFullYear(), 0, 1) }, 
          status: 'completed' 
        } 
      },
      { 
        $group: { 
          _id: { 
            $dateToString: { 
              format: '%Y-%m', 
              date: '$date' 
            } 
          }, 
          revenue: { $sum: '$finalAmount' },
          appointments: { $sum: 1 }
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalCustomers,
          newCustomers,
          totalAppointments,
          completedAppointments,
          pendingAppointments,
          cancelledAppointments,
          totalRevenue,
          averageServicePrice
        },
        popularServices,
        dailyRevenue,
        monthlyStats,
        period
      }
    });

  } catch (error) {
    console.error('خطا در دریافت آمار:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت آمار' },
      { status: 500 }
    );
  }
}
