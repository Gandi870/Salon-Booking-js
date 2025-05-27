// src/app/customers/page.tsx
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  User, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  MoreVertical,
  UserCheck,
  UserX,
  TrendingUp,
  Clock,
  MapPin,
  Heart,
  DollarSign,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  avatar?: string
  joinDate: string
  lastVisit: string
  totalVisits: number
  totalSpent: number
  status: 'active' | 'inactive' | 'vip' | 'new'
  rating: number
  location: string
  birthDate?: string
  notes?: string
  preferredServices: string[]
  nextAppointment?: string
}

interface CustomerStats {
  total: number
  active: number
  new: number
  vip: number
  growthRate: number
}

export default function CustomersPage() {
  // States
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock Data
  const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'احمد محمدی',
      phone: '09123456789',
      email: 'ahmad@email.com',
      avatar: '/avatars/1.jpg',
      joinDate: '2024-01-15',
      lastVisit: '2024-05-25',
      totalVisits: 12,
      totalSpent: 2500000,
      status: 'vip',
      rating: 5,
      location: 'تهران',
      birthDate: '1990-03-15',
      notes: 'مشتری وفادار و راضی از خدمات',
      preferredServices: ['اصلاح مو', 'ریش تراشی'],
      nextAppointment: '2024-05-28'
    },
    {
      id: '2',
      name: 'مریم کریمی',
      phone: '09187654321',
      email: 'maryam@email.com',
      joinDate: '2024-03-20',
      lastVisit: '2024-05-26',
      totalVisits: 8,
      totalSpent: 1800000,
      status: 'active',
      rating: 4,
      location: 'اصفهان',
      preferredServices: ['رنگ مو', 'کوتاهی'],
      nextAppointment: '2024-05-29'
    },
    {
      id: '3',
      name: 'رضا احمدی',
      phone: '09159876543',
      email: 'reza@email.com',
      joinDate: '2024-05-20',
      lastVisit: '2024-05-20',
      totalVisits: 1,
      totalSpent: 150000,
      status: 'new',
      rating: 4,
      location: 'مشهد',
      preferredServices: ['اصلاح مو']
    },
    {
      id: '4',
      name: 'فاطمه رضایی',
      phone: '09121239876',
      email: 'fatemeh@email.com',
      joinDate: '2023-12-10',
      lastVisit: '2024-03-15',
      totalVisits: 15,
      totalSpent: 3200000,
      status: 'inactive',
      rating: 3,
      location: 'شیراز',
      preferredServices: ['کراتینه', 'هایلایت']
    }
  ]

  // Mock Stats
  const stats: CustomerStats = {
    total: 1247,
    active: 892,
    new: 156,
    vip: 89,
    growthRate: 12.5
  }

  // Effects
  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setCustomers(mockCustomers)
      setFilteredCustomers(mockCustomers)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and Search Logic
  useEffect(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort customers
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'joinDate':
          aValue = new Date(a.joinDate)
          bValue = new Date(b.joinDate)
          break
        case 'lastVisit':
          aValue = new Date(a.lastVisit)
          bValue = new Date(b.lastVisit)
          break
        case 'totalSpent':
          aValue = a.totalSpent
          bValue = b.totalSpent
          break
        case 'totalVisits':
          aValue = a.totalVisits
          bValue = b.totalVisits
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, statusFilter, sortBy, sortOrder])

  // Functions
  const handleSelectCustomer = useCallback((customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }, [selectedCustomers, filteredCustomers])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'from-purple-500 to-pink-500'
      case 'active': return 'from-green-500 to-emerald-500'
      case 'new': return 'from-blue-500 to-cyan-500'
      case 'inactive': return 'from-gray-400 to-gray-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'vip': return 'ویژه'
      case 'active': return 'فعال'
      case 'new': return 'جدید'
      case 'inactive': return 'غیرفعال'
      default: return status
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR')
  }

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden">
      {/* VIP Badge */}
      {customer.status === 'vip' && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Award className="w-4 h-4" />
            ویژه
          </div>
        </div>
      )}

      {/* Selection Checkbox */}
      <div className="absolute top-4 right-4 z-10">
        <input
          type="checkbox"
          checked={selectedCustomers.includes(customer.id)}
          onChange={() => handleSelectCustomer(customer.id)}
          className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
        />
      </div>

      <div className="p-6">
        {/* Avatar & Basic Info */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
              {customer.avatar ? (
                <img src={customer.avatar} alt={customer.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                customer.name.charAt(0)
              )}
            </div>
            {/* Status Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              customer.status === 'active' ? 'bg-green-500' :
              customer.status === 'vip' ? 'bg-purple-500' :
              customer.status === 'new' ? 'bg-blue-500' : 'bg-gray-400'
            }`} />
          </div>
          
          <div className="mr-4 flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1">{customer.name}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{customer.location}</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < customer.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 mr-2">{customer.rating}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تعداد مراجعات</p>
                <p className="text-2xl font-bold text-blue-600">{customer.totalVisits}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">کل خرید</p>
                <p className="text-lg font-bold text-green-600">{(customer.totalSpent / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">آخرین مراجعه: {formatDate(customer.lastVisit)}</span>
          </div>
        </div>

        {/* Next Appointment */}
        {customer.nextAppointment && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-900">نوبت بعدی</p>
                <p className="text-sm text-purple-700">{formatDate(customer.nextAppointment)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCustomer(customer)
              setShowCustomerModal(true)
            }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            مشاهده
          </button>
          
          <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          
          <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                مدیریت مشتریان
              </h1>
              <p className="text-gray-600 mt-2">لیست کامل مشتریان و اطلاعات آن‌ها</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                افزودن مشتری
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Customers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">کل مشتریان</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString('fa-IR')}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">+{stats.growthRate}%</span>
                  <span className="text-sm text-gray-500">این ماه</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active Customers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">مشتریان فعال</p>
                <p className="text-3xl font-bold text-gray-900">{stats.active.toLocaleString('fa-IR')}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(stats.active / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <UserCheck className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          {/* New Customers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">مشتریان جدید</p>
                <p className="text-3xl font-bold text-gray-900">{stats.new.toLocaleString('fa-IR')}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm font-medium text-blue-600">این ماه</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          {/* VIP Customers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">مشتریان ویژه</p>
                <p className="text-3xl font-bold text-gray-900">{stats.vip.toLocaleString('fa-IR')}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Heart className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-600">ارزشمند</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <Award className="w-7 h-7 text-purple-600" />
              </div>
            </div>
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
                  placeholder="جستجو بر اساس نام، تلفن یا ایمیل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
              <option value="vip">ویژه</option>
              <option value="new">جدید</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="name">نام</option>
              <option value="joinDate">تاریخ عضویت</option>
              <option value="lastVisit">آخرین مراجعه</option>
              <option value="totalSpent">کل خرید</option>
              <option value="totalVisits">تعداد مراجعات</option>
            </select>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 flex items-center gap-2"
            >
              <TrendingUp className={`w-4 h-4 transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
              {sortOrder === 'asc' ? 'صعودی' : 'نزولی'}
            </button>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                کارتی
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                لیستی
              </button>
            </div>

            {/* Bulk Actions */}
            {selectedCustomers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedCustomers.length} انتخاب شده
                </span>
                <button className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors duration-200">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
                <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200">
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            )}
          </div>

          {/* Select All */}
          {filteredCustomers.length > 0 && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
              <input
                type="checkbox"
                checked={selectedCustomers.length === filteredCustomers.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600">انتخاب همه</span>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Customers Grid */}
        {!isLoading && (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">مشتری‌ای یافت نشد</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'تغییر فیلترها یا جستجوی جدید امتحان کنید'
                : 'اولین مشتری خود را اضافه کنید'
              }
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              افزودن مشتری جدید
            </button>
          </div>
        )}
      </div>

      {/* Customer Detail Modal - You can implement this */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal content here */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">جزئیات مشتری</h2>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600">در حال توسعه...</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal - You can implement this */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">افزودن مشتری جدید</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600">در حال توسعه...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
