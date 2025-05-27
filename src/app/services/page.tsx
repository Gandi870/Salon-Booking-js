// src/app/services/page.tsx
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Scissors, 
  Palette, 
  Sparkles,
  Crown,
  Wand2,
  Star,
  Heart,
  Gem,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Copy,
  Share2,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Users,
  Award,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Timer,
  Tag,
  Bookmark,
  Image,
  Upload,
  Download,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Save,
  X,
  ShoppingBag,
  Gift,
  Percent,
  Camera
} from 'lucide-react'

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  duration: number // in minutes
  image?: string
  popularity: number // 1-5 stars
  difficulty: 'آسان' | 'متوسط' | 'سخت' | 'تخصصی'
  specialists: string[]
  tags: string[]
  isActive: boolean
  isPopular: boolean
  isFeatured: boolean
  isNew: boolean
  equipment: string[]
  aftercare: string[]
  bookingCount: number
  revenue: number
  rating: number
  reviewCount: number
  estimatedTime: {
    min: number
    max: number
  }
  seasonality?: 'همه فصول' | 'بهار' | 'تابستان' | 'پاییز' | 'زمستان'
  ageGroup?: 'همه سنین' | 'کودک' | 'نوجوان' | 'جوان' | 'میانسال' | 'سالمند'
  gender?: 'همه' | 'زن' | 'مرد'
  createdAt: string
  updatedAt: string
}

interface ServiceStats {
  total: number
  active: number
  popular: number
  totalRevenue: number
  avgPrice: number
  topCategory: string
  growth: number
}

interface ServiceCategory {
  id: string
  name: string
  icon: React.ElementType
  color: string
  count: number
  revenue: number
}

export default function ServicesPage() {
  // States
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [priceFilter, setPriceFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cards'>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  // Categories
  const categories: ServiceCategory[] = [
    { 
      id: 'haircut', 
      name: 'اصلاح مو', 
      icon: Scissors, 
      color: 'from-blue-500 to-cyan-500',
      count: 0,
      revenue: 0
    },
    { 
      id: 'coloring', 
      name: 'رنگ مو', 
      icon: Palette, 
      color: 'from-purple-500 to-pink-500',
      count: 0,
      revenue: 0
    },
    { 
      id: 'styling', 
      name: 'شینیون', 
      icon: Crown, 
      color: 'from-yellow-500 to-orange-500',
      count: 0,
      revenue: 0
    },
    { 
      id: 'treatment', 
      name: 'تریتمنت', 
      icon: Sparkles, 
      color: 'from-green-500 to-emerald-500',
      count: 0,
      revenue: 0
    },
    { 
      id: 'special', 
      name: 'خدمات ویژه', 
      icon: Gem, 
      color: 'from-rose-500 to-red-500',
      count: 0,
      revenue: 0
    },
    { 
      id: 'bridal', 
      name: 'آرایش عروس', 
      icon: Heart, 
      color: 'from-pink-500 to-rose-500',
      count: 0,
      revenue: 0
    }
  ]

  // Mock Data
  const mockServices: Service[] = [
    {
      id: '1',
      name: 'اصلاح مو کلاسیک',
      category: 'اصلاح مو',
      description: 'اصلاح حرفه‌ای مو با تکنیک‌های مدرن و ابزارهای استریل',
      price: 150000,
      originalPrice: 180000,
      discount: 17,
      duration: 45,
      image: '/services/haircut-classic.jpg',
      popularity: 5,
      difficulty: 'آسان',
      specialists: ['استاد رضا', 'استاد علی', 'استاد محمد'],
      tags: ['کلاسیک', 'مردانه', 'حرفه‌ای'],
      isActive: true,
      isPopular: true,
      isFeatured: false,
      isNew: false,
      equipment: ['قیچی حرفه‌ای', 'ماشین اصلاح، 'شانه'],
      aftercare: ['شستشو با شامپو مناسب', 'استفاده از کرم مرطوب‌کننده'],
      bookingCount: 287,
      revenue: 4305000,
      rating: 4.8,
      reviewCount: 156,
      estimatedTime: { min: 30, max: 60 },
      seasonality: 'همه فصول',
      ageGroup: 'همه سنین',
      gender: 'mرد',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-05-26T15:30:00Z'
    },
    {
      id: '2',
      name: 'رنگ مو فانتزی',
      category: 'رنگ مو',
      description: 'رنگ‌آمیزی مو با رنگ‌های متنوع و جدیدترین تکنیک‌های روز دنیا',
      price: 450000,
      originalPrice: 500000,
      discount: 10,
      duration: 180,
      image: '/services/hair-coloring.jpg',
      popularity: 4,
      difficulty: 'تخصصی',
      specialists: ['خانم فاطمه', 'خانم زهرا'],
      tags: ['رنگی', 'فانتزی', 'مدرن'],
      isActive: true,
      isPopular: true,
      isFeatured: true,
      isNew: false,
      equipment: ['رنگ حرفه‌ای', 'برس رنگ', 'کلاهک'],
      aftercare: ['استفاده از شامپو ویژه موی رنگ شده', 'ماسک موی مرطوب‌کننده'],
      bookingCount: 143,
      revenue: 6435000,
      rating: 4.9,
      reviewCount: 89,
      estimatedTime: { min: 120, max: 240 },
      seasonality: 'همه فصول',
      ageGroup: 'جوان',
      gender: 'همه',
      createdAt: '2024-02-01T10:00:00Z',
      updatedAt: '2024-05-25T12:00:00Z'
    },
    {
      id: '3',
      name: 'شینیون عروس',
      category: 'آرایش عروس',
      description: 'شینیون حرفه‌ای و زیبای عروس با بهترین متریال و تزیینات',
      price: 850000,
      originalPrice: 1000000,
      discount: 15,
      duration: 120,
      image: '/services/bridal-hair.jpg',
      popularity: 5,
      difficulty: 'تخصصی',
      specialists: ['خانم مریم', 'خانم سارا'],
      tags: ['عروس', 'مجلسی', 'شینیون'],
      isActive: true,
      isPopular: false,
      isFeatured: true,
      isNew: true,
      equipment: ['گیره‌های ویژه', 'اسپری موی قوی', 'تزیینات'],
      aftercare: ['مراقبت از شینیون تا پایان مراسم', 'استفاده محدود از اسپری'],
      bookingCount: 67,
      revenue: 5695000,
      rating: 5.0,
      reviewCount: 34,
      estimatedTime: { min: 90, max: 150 },
      seasonality: 'همه فصول',
      ageGroup: 'جوان',
      gender: 'زن',
      createdAt: '2024-04-10T10:00:00Z',
      updatedAt: '2024-05-27T09:00:00Z'
    },
    {
      id: '4',
      name: 'کراتینه درمانی',
      category: 'تریتمنت',
      description: 'درمان و تقویت مو با کراتین طبیعی و مواد مغذی',
      price: 320000,
      duration: 150,
      image: '/services/keratin-treatment.jpg',
      popularity: 4,
      difficulty: 'متوسط',
      specialists: ['خانم لیلا', 'خانم نازنین'],
      tags: ['درمانی', 'کراتین', 'تقویتی'],
      isActive: true,
      isPopular: true,
      isFeatured: false,
      isNew: false,
      equipment: ['کراتین حرفه‌ای', 'حوله گرم', 'سشوار'],
      aftercare: ['عدم شستشو تا 72 ساعت', 'استفاده از شامپو بدون سولفات'],
      bookingCount: 98,
      revenue: 3136000,
      rating: 4.7,
      reviewCount: 52,
      estimatedTime: { min: 120, max: 180 },
      seasonality: 'زمستان',
      ageGroup: 'همه سنین',
      gender: 'همه',
      createdAt: '2024-03-05T10:00:00Z',
      updatedAt: '2024-05-20T14:00:00Z'
    },
    {
      id: '5',
      name: 'هایلایت حرفه‌ای',
      category: 'رنگ مو',
      description: 'هایلایت زیبا و طبیعی با تکنیک‌های مدرن و رنگ‌های باکیفیت',
      price: 280000,
      duration: 90,
      image: '/services/highlights.jpg',
      popularity: 4,
      difficulty: 'متوسط',
      specialists: ['خانم زهرا', 'خانم فاطمه'],
      tags: ['هایلایت', 'طبیعی', 'زیبا'],
      isActive: true,
      isPopular: true,
      isFeatured: false,
      isNew: false,
      equipment: ['فویل آلومینیومی', 'رنگ هایلایت', 'برس مخصوص'],
      aftercare: ['استفاده از ماسک مرطوب‌کننده', 'محافظت از نور مستقیم خورشید'],
      bookingCount: 156,
      revenue: 4368000,
      rating: 4.6,
      reviewCount: 78,
      estimatedTime: { min: 60, max: 120 },
      seasonality: 'بهار',
      ageGroup: 'جوان',
      gender: 'همه',
      createdAt: '2024-02-20T10:00:00Z',
      updatedAt: '2024-05-15T11:00:00Z'
    }
  ]

  // Calculate stats
  const stats: ServiceStats = useMemo(() => {
    const activeServices = services.filter(s => s.isActive)
    const popularServices = services.filter(s => s.isPopular)
    const totalRevenue = services.reduce((sum, s) => sum + s.revenue, 0)
    const avgPrice = services.length > 0 ? services.reduce((sum, s) => sum + s.price, 0) / services.length : 0
    
    // Find top category by revenue
    const categoryRevenue: { [key: string]: number } = {}
    services.forEach(service => {
      if (!categoryRevenue[service.category]) {
        categoryRevenue[service.category] = 0
      }
      categoryRevenue[service.category] += service.revenue
    })
    const topCategory = Object.keys(categoryRevenue).reduce((a, b) => 
      categoryRevenue[a] > categoryRevenue[b] ? a : b, ''
    )

    return {
      total: services.length,
      active: activeServices.length,
      popular: popularServices.length,
      totalRevenue,
      avgPrice,
      topCategory,
      growth: 12.5 // Mock growth
    }
  }, [services])

  // Update category counts
  const updatedCategories = useMemo(() => {
    return categories.map(category => {
      const categoryServices = services.filter(service => 
        service.category.includes(category.name)
      )
      return {
        ...category,
        count: categoryServices.length,
        revenue: categoryServices.reduce((sum, service) => sum + service.revenue, 0)
      }
    })
  }, [services, categories])

  // Effects
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setServices(mockServices)
      setFilteredServices(mockServices)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and sort services
  useEffect(() => {
    let filtered = services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter
      
      const matchesPrice = priceFilter === 'all' || 
        (priceFilter === 'low' && service.price < 200000) ||
        (priceFilter === 'medium' && service.price >= 200000 && service.price < 500000) ||
        (priceFilter === 'high' && service.price >= 500000)
      
      const matchesDifficulty = difficultyFilter === 'all' || service.difficulty === difficultyFilter

      return matchesSearch && matchesCategory && matchesPrice && matchesDifficulty
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'popularity':
          aValue = a.popularity
          bValue = b.popularity
          break
        case 'revenue':
          aValue = a.revenue
          bValue = b.revenue
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'bookings':
          aValue = a.bookingCount
          bValue = b.bookingCount
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue, 'fa')
          : bValue.localeCompare(aValue, 'fa')
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
    })

    setFilteredServices(filtered)
  }, [services, searchTerm, categoryFilter, priceFilter, difficultyFilter, sortBy, sortOrder])

  // Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان'
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours} ساعت ${mins > 0 ? `و ${mins} دقیقه` : ''}`
    }
    return `${mins} دقیقه`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'آسان': return 'bg-green-100 text-green-800'
      case 'متوسط': return 'bg-yellow-100 text-yellow-800'
      case 'سخت': return 'bg-orange-100 text-orange-800'
      case 'تخصصی': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'آسان': return Target
      case 'متوسط': return BarChart3
      case 'sخت': return TrendingUp
      case 'تخصصی': return Award
      default: return Target
    }
  }

  const toggleServiceStatus = (serviceId: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, isActive: !service.isActive }
          : service
      )
    )
  }

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId))
  }

  const ServiceCard = ({ service }: { service: Service }) => {
    const DifficultyIcon = getDifficultyIcon(service.difficulty)
    
    return (
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
        {/* Service Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
            {service.image ? (
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Scissors className="w-16 h-16 text-white opacity-60" />
              </div>
            )}
          </div>
          
          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {service.isNew && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                جدید
              </div>
            )}
            {service.isFeatured && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Crown className="w-3 h-3" />
                ویژه
              </div>
            )}
            {service.isPopular && (
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3" />
                محبوب
              </div>
            )}
          </div>

          {/* Discount badge */}
          {service.discount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {service.discount}% تخفیف
            </div>
          )}

          {/* Status indicator */}
          <div className={`absolute bottom-4 left-4 w-3 h-3 rounded-full ${
            service.isActive ? 'bg-green-500' : 'bg-red-500'
          } ring-2 ring-white`} />
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-600 transition-colors duration-200">
              {service.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {service.description}
            </p>
            
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-purple-600 font-medium">
                {service.category}
              </span>
            </div>
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">قیمت</span>
              </div>
              <div>
                <p className="font-bold text-green-900">
                  {formatCurrency(service.price)}
                </p>
                {service.originalPrice && (
                  <p className="text-xs text-gray-500 line-through">
                    {formatCurrency(service.originalPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-600">مدت</span>
              </div>
              <p className="font-bold text-blue-900">
                {formatDuration(service.duration)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{service.rating}</span>
              </div>
              <span className="text-xs text-gray-500">{service.reviewCount} نظر</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{service.bookingCount}</span>
              </div>
              <span className="text-xs text-gray-500">رزرو</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{(service.revenue / 1000000).toFixed(1)}M</span>
              </div>
              <span className="text-xs text-gray-500">درآمد</span>
            </div>
          </div>

          {/* Difficulty & Specialists */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">سطح مهارت:</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getDifficultyColor(service.difficulty)}`}>
                <DifficultyIcon className="w-3 h-3" />
                {service.difficulty}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-gray-600">متخصصان:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {service.specialists.slice(0, 2).map((specialist, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs">
                    {specialist}
                  </span>
                ))}
                {service.specialists.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                    +{service.specialists.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {service.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedService(service)
                setShowServiceModal(true)
              }}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              مشاهده
            </button>
            
            <button
              onClick={() => {
                setEditingService(service)
                setShowEditModal(true)
              }}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            
            <button
              onClick={() => toggleServiceStatus(service.id)}
              className={`p-3 rounded-xl transition-colors duration-200 ${
                service.isActive 
                  ? 'bg-green-100 hover:bg-green-200 text-green-600'
                  : 'bg-red-100 hover:bg-red-200 text-red-600'
              }`}
            >
              {service.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            </button>
            
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justifty-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                <Scissors className="w-8 h-8 text-purple-600" />
                مدیریت خدمات
                <Sparkles className="w-6 h-6 text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                مدیریت کامل خدمات و تعرفه‌های آرایشگاه
                <Gem className="w-4 h-4 text-purple-500 animate-pulse" />
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Download className="w-5 h-5" />
                خروجی Excel
              </button>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                خدمت جدید
                <Crown className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Services */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">تعداد خدمات</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">{stats.active} فعال</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">کل درآمد</p>
                  <p className="text-2xl font-bold text-gray-900">{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-7 h-7 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Average Price */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">میانگین قیمت</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(stats.avgPrice / 1000)}K</p>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(Math.round(stats.avgPrice))}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">خدمات محبوب</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.popular}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">+{stats.growth}%</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-7 h-7 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-purple-600" />
            دسته‌بندی خدمات
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {updatedCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg ${
                    categoryFilter === category.name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <div className="text-xs text-gray-500">
                    <div>{category.count} خدمت</div>
                    <div className="font-medium text-green-600">
                      {(category.revenue / 1000000).toFixed(1)}M تومان
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="جستجوی خدمات، برچسب‌ها یا توضیحات... ✨"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 focus:bg-white"
                />
              </div>
            </div>

            {/* Filters */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">همه قیمت‌ها</option>
              <option value="low">کمتر از ۲۰۰ هزار</option>
              <option value="medium">۲۰۰ تا ۵۰۰ هزار</option>
              <option value="high">بالای ۵۰۰ هزار</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">همه سطوح</option>
              <option value="آسان">آسان</option>
              <option value="متوسط">متوسط</option>
              <option value="سخت">سخت</option>
              <option value="تخصصی">تخصصی</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="name">نام</option>
              <option value="price">قیمت</option>
              <option value="popularity">محبوبیت</option>
              <option value="revenue">درآمد</option>
              <option value="rating">امتیاز</option>
              <option value="bookings">تعداد رزرو</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
            >
              {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            </button>

            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                شبکه
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                لیست
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
              <Scissors className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-purple-600 animate-pulse" />
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">خدمتی یافت نشد</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== 'all' || priceFilter !== 'all' || difficultyFilter !== 'all'
                ? 'تغییر فیلترها یا جستجوی جدید امتحان کنید'
                : 'اولین خدمت خود را ایجاد کنید'
              }
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              ایجاد خدمت جدید
              <Gem className="w-4 h-4 animate-pulse" />
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-2xl"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Eye className="w-6 h-6 text-purple-600" />
                  جزئیات خدمت
                </h2>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">نمایش جزئیات کامل خدمت در حال توسعه است...</p>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-700 overflow-auto">
                    {JSON.stringify(selectedService, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-2xl"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Plus className="w-6 h-6 text-purple-600" />
                  افزودن خدمت جدید
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600">فرم ایجاد خدمت جدید در حال توسعه است...</p>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-2xl"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Edit className="w-6 h-6 text-purple-600" />
                  ویرایش خدمت
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600">فرم ویرایش خدمت در حال توسعه است...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
