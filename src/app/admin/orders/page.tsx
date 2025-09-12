'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Truck, 
  Package, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  products: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: string;
  orderDate: string;
  deliveryDate?: string;
}

const AdminOrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-0001',
      customerName: '김철수',
      customerPhone: '010-1234-5678',
      products: [
        { id: 1, name: '신선한 토마토', quantity: 2, price: 3500 },
        { id: 2, name: '유기농 상추', quantity: 1, price: 2800 }
      ],
      totalAmount: 9800,
      status: 'preparing',
      paymentMethod: '카드결제',
      paymentStatus: 'completed',
      shippingAddress: '서울시 강남구 테헤란로 123',
      orderDate: '2024-02-15 14:30:00'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-0002',
      customerName: '이영희',
      customerPhone: '010-9876-5432',
      products: [
        { id: 3, name: '방울토마토', quantity: 3, price: 4200 },
        { id: 5, name: '국산 사과', quantity: 1, price: 8000 }
      ],
      totalAmount: 20600,
      status: 'shipping',
      paymentMethod: '무통장입금',
      paymentStatus: 'completed',
      shippingAddress: '부산시 해운대구 센텀로 456',
      orderDate: '2024-02-14 10:15:00',
      deliveryDate: '2024-02-16'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-0003',
      customerName: '박민수',
      customerPhone: '010-5555-1111',
      products: [
        { id: 4, name: '친환경 당근', quantity: 2, price: 2500 }
      ],
      totalAmount: 5000,
      status: 'delivered',
      paymentMethod: '카드결제',
      paymentStatus: 'completed',
      shippingAddress: '대구시 중구 중앙로 789',
      orderDate: '2024-02-13 16:45:00',
      deliveryDate: '2024-02-15'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-0004',
      customerName: '최영수',
      customerPhone: '010-7777-2222',
      products: [
        { id: 1, name: '신선한 토마토', quantity: 5, price: 3500 }
      ],
      totalAmount: 17500,
      status: 'pending',
      paymentMethod: '무통장입금',
      paymentStatus: 'pending',
      shippingAddress: '인천시 남동구 구월로 321',
      orderDate: '2024-02-15 09:20:00'
    }
  ]);

  const statusLabels = {
    'all': '전체',
    'pending': '주문접수',
    'confirmed': '주문확인',
    'preparing': '상품준비중',
    'shipping': '배송중',
    'delivered': '배송완료',
    'cancelled': '주문취소'
  };

  const paymentStatusLabels = {
    'all': '전체',
    'pending': '결제대기',
    'completed': '결제완료',
    'failed': '결제실패'
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      'confirmed': { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      'preparing': { bg: 'bg-orange-100', text: 'text-orange-800', icon: Package },
      'shipping': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Truck },
      'delivered': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3" />
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getPaymentBadge = (status: string) => {
    const config = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config[status as keyof typeof config]}`}>
        {paymentStatusLabels[status as keyof typeof paymentStatusLabels]}
      </span>
    );
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // 실제로는 API 호출
    console.log(`주문 ${orderId}의 상태를 ${newStatus}로 변경`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
            <p className="text-gray-600 mt-1">고객 주문을 관리하고 배송 상태를 업데이트할 수 있습니다.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="h-4 w-4" />
              새로고침
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              주문 내보내기
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 주문</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">처리 대기</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">배송중</p>
                <p className="text-2xl font-bold text-purple-600">
                  {orders.filter(o => o.status === 'shipping').length}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">배송완료</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="주문번호, 고객명, 연락처로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(paymentStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">전체 기간</option>
              <option value="today">오늘</option>
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
            </select>
          </div>
        </div>
      </div>

      {/* 주문 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상품
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  결제
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 상태
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{formatDate(order.orderDate)}</div>
                      {order.deliveryDate && (
                        <div className="text-xs text-green-600">배송예정: {order.deliveryDate}</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      <div className="text-xs text-gray-400 max-w-xs truncate" title={order.shippingAddress}>
                        {order.shippingAddress}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.products.slice(0, 2).map((product, index) => (
                        <div key={index} className="text-sm text-gray-900">
                          {product.name} × {product.quantity}
                        </div>
                      ))}
                      {order.products.length > 2 && (
                        <div className="text-xs text-gray-500">
                          외 {order.products.length - 2}개
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(order.totalAmount)}원
                      </div>
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                      {getPaymentBadge(order.paymentStatus)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {getStatusBadge(order.status)}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="block w-full text-xs border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="pending">주문접수</option>
                        <option value="confirmed">주문확인</option>
                        <option value="preparing">상품준비중</option>
                        <option value="shipping">배송중</option>
                        <option value="delivered">배송완료</option>
                        <option value="cancelled">주문취소</option>
                      </select>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      <Eye className="h-3 w-3" />
                      상세보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">주문이 없습니다</h3>
            <p className="mt-1 text-sm text-gray-500">검색 조건을 변경해보세요.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {filteredOrders.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredOrders.length}</span>개의 주문
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              이전
            </button>
            <span className="px-3 py-2 text-sm bg-green-500 text-white rounded-lg">1</span>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;