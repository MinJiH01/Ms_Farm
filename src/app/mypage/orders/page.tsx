'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  status: string;
  totalAmount: number;
  shippingFee: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
  paymentMethod: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const ordersPerPage = 5;
  const statusOptions = [
    { value: 'all', label: '전체', count: 0 },
    { value: '주문완료', label: '주문완료', count: 0 },
    { value: '배송준비', label: '배송준비', count: 0 },
    { value: '배송중', label: '배송중', count: 0 },
    { value: '배송완료', label: '배송완료', count: 0 },
    { value: '주문취소', label: '주문취소', count: 0 }
  ];

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // 주문 데이터 로드 (임시 데이터)
    const mockOrders: Order[] = [
      {
        id: 1001,
        date: '2024-03-15T10:30:00',
        status: '배송중',
        totalAmount: 15700,
        shippingFee: 0,
        items: [
          { id: 1, name: '신선한 토마토', price: 3500, quantity: 2, image: '/images/tomato.jpg' },
          { id: 2, name: '국산 사과', price: 8000, quantity: 1, image: '/images/apple.jpg' }
        ],
        shippingAddress: '서울시 강남구 테헤란로 123, 아파트 101동 1001호',
        trackingNumber: '1234567890',
        paymentMethod: 'BC카드'
      },
      {
        id: 1002,
        date: '2024-03-10T14:20:00',
        status: '배송완료',
        totalAmount: 26400,
        shippingFee: 3000,
        items: [
          { id: 3, name: '유기농 상추', price: 2800, quantity: 3, image: '/images/lettuce.jpg' },
          { id: 4, name: '달콤한 딸기', price: 12000, quantity: 1, image: '/images/strawberry.jpg' },
          { id: 5, name: '방울토마토', price: 4200, quantity: 1, image: '/images/cherry-tomato.jpg' }
        ],
        shippingAddress: '서울시 강남구 테헤란로 123, 아파트 101동 1001호',
        trackingNumber: '0987654321',
        paymentMethod: '신용카드'
      },
      {
        id: 1003,
        date: '2024-02-28T09:15:00',
        status: '주문취소',
        totalAmount: 12500,
        shippingFee: 0,
        items: [
          { id: 6, name: '친환경 당근', price: 2500, quantity: 2, image: '/images/carrot.jpg' },
          { id: 7, name: '유기농 시금치', price: 3800, quantity: 2, image: '/images/spinach.jpg' }
        ],
        shippingAddress: '서울시 강남구 테헤란로 123, 아파트 101동 1001호',
        paymentMethod: '계좌이체'
      },
      {
        id: 1004,
        date: '2024-02-20T16:45:00',
        status: '배송완료',
        totalAmount: 18200,
        shippingFee: 3000,
        items: [
          { id: 8, name: '신선한 배추', price: 3200, quantity: 2, image: '/images/cabbage.jpg' },
          { id: 9, name: '달콤한 단호박', price: 4500, quantity: 2, image: '/images/pumpkin.jpg' }
        ],
        shippingAddress: '서울시 강남구 테헤란로 123, 아파트 101동 1001호',
        trackingNumber: '1122334455',
        paymentMethod: '무통장입금'
      }
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    let filtered = orders;

    // 상태 필터링
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    // 검색 필터링
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toString().includes(searchQuery) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // 날짜 필터링
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate = new Date();

      switch (dateRange) {
        case '1month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case '6months':
          startDate.setMonth(now.getMonth() - 6);
          break;
        case '1year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(order => new Date(order.date) >= startDate);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, selectedStatus, searchQuery, dateRange]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      '주문완료': <Clock className="h-5 w-5" />,
      '배송준비': <Package className="h-5 w-5" />,
      '배송중': <Truck className="h-5 w-5" />,
      '배송완료': <CheckCircle className="h-5 w-5" />,
      '주문취소': <XCircle className="h-5 w-5" />
    };
    return icons[status as keyof typeof icons];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      '주문완료': 'bg-blue-100 text-blue-800',
      '배송준비': 'bg-yellow-100 text-yellow-800',
      '배송중': 'bg-green-100 text-green-800',
      '배송완료': 'bg-gray-100 text-gray-800',
      '주문취소': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // 페이지네이션
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">주문 내역을 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/mypage"
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">주문 내역</h1>
            <p className="text-gray-600">주문한 상품의 현황을 확인하세요</p>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* 검색 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="주문번호 또는 상품명 검색"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* 상태 필터 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* 날짜 필터 */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">전체 기간</option>
              <option value="1month">최근 1개월</option>
              <option value="3months">최근 3개월</option>
              <option value="6months">최근 6개월</option>
              <option value="1year">최근 1년</option>
            </select>

            {/* 초기화 버튼 */}
            <button
              onClick={() => {
                setSelectedStatus('all');
                setSearchQuery('');
                setDateRange('all');
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              필터 초기화
            </button>
          </div>
        </div>

        {/* 주문 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statusOptions.map(status => {
            const count = status.value === 'all' 
              ? orders.length 
              : orders.filter(order => order.status === status.value).length;
            
            return (
              <div
                key={status.value}
                className={`bg-white rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  selectedStatus === status.value
                    ? 'ring-2 ring-green-500 bg-green-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus(status.value)}
              >
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{status.label}</div>
              </div>
            );
          })}
        </div>

        {/* 주문 목록 */}
        <div className="space-y-6">
          {currentOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 주문 헤더 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      주문번호 #{order.id}
                    </h3>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                    <div className="font-bold text-lg text-gray-900">
                      {formatPrice(order.totalAmount)}원
                    </div>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-800">
                        운송장번호: {order.trackingNumber}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        배송조회
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 주문 상품 */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 items-center justify-center hidden">
                          <span className="text-xs text-gray-500">상품</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.price)}원 × {item.quantity}개
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 주문 요약 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <div>결제수단: {order.paymentMethod}</div>
                      <div className="mt-1">배송지: {order.shippingAddress}</div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-sm text-gray-600">
                        상품금액: {formatPrice(order.totalAmount - order.shippingFee)}원
                      </div>
                      {order.shippingFee > 0 && (
                        <div className="text-sm text-gray-600">
                          배송비: {formatPrice(order.shippingFee)}원
                        </div>
                      )}
                      <div className="text-lg font-bold text-gray-900">
                        총 결제금액: {formatPrice(order.totalAmount)}원
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주문 액션 버튼들 */}
                <div className="mt-6 flex gap-3 justify-end">
                  <Link
                    href={`/mypage/orders/${order.id}`}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    상세보기
                  </Link>
                  
                  {order.status === '배송완료' && (
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                      리뷰 작성
                    </button>
                  )}
                  
                  {(order.status === '주문완료' || order.status === '배송준비') && (
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                      주문 취소
                    </button>
                  )}
                  
                  {order.status === '배송완료' && (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                      재주문
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 결과가 없을 때 */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              주문 내역이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              검색 조건을 변경하거나 새로운 주문을 해보세요.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              상품 둘러보기 <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-green-500 text-white border-green-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;