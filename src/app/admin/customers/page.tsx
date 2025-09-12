'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingBag,
  TrendingUp,
  Eye,
  Edit,
  Ban,
  Download
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  lastOrderDate?: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'vip';
  birthDate?: string;
}

const AdminCustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMembership, setSelectedMembership] = useState('all');

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: '김철수',
      email: 'kim@email.com',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      joinDate: '2023-05-15',
      lastOrderDate: '2024-02-15',
      totalOrders: 15,
      totalSpent: 245000,
      status: 'active',
      membershipLevel: 'gold',
      birthDate: '1985-03-20'
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@email.com',
      phone: '010-9876-5432',
      address: '부산시 해운대구 센텀로 456',
      joinDate: '2023-08-20',
      lastOrderDate: '2024-02-14',
      totalOrders: 8,
      totalSpent: 120000,
      status: 'active',
      membershipLevel: 'silver'
    },
    {
      id: '3',
      name: '박민수',
      email: 'park@email.com',
      phone: '010-5555-1111',
      address: '대구시 중구 중앙로 789',
      joinDate: '2023-12-01',
      lastOrderDate: '2024-02-13',
      totalOrders: 3,
      totalSpent: 45000,
      status: 'active',
      membershipLevel: 'bronze'
    },
    {
      id: '4',
      name: '최영수',
      email: 'choi@email.com',
      phone: '010-7777-2222',
      address: '인천시 남동구 구월로 321',
      joinDate: '2023-02-10',
      lastOrderDate: '2023-12-05',
      totalOrders: 25,
      totalSpent: 580000,
      status: 'inactive',
      membershipLevel: 'vip',
      birthDate: '1978-11-15'
    },
    {
      id: '5',
      name: '정미애',
      email: 'jung@email.com',
      phone: '010-3333-4444',
      address: '광주시 서구 상무로 654',
      joinDate: '2024-01-05',
      lastOrderDate: '2024-02-12',
      totalOrders: 2,
      totalSpent: 18000,
      status: 'active',
      membershipLevel: 'bronze'
    }
  ]);

  const membershipLabels = {
    'all': '전체',
    'bronze': '브론즈',
    'silver': '실버',
    'gold': '골드',
    'vip': 'VIP'
  };

  const statusLabels = {
    'all': '전체',
    'active': '활성',
    'inactive': '비활성',
    'blocked': '차단'
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    const matchesMembership = selectedMembership === 'all' || customer.membershipLevel === selectedMembership;
    
    return matchesSearch && matchesStatus && matchesMembership;
  });

  const getMembershipBadge = (level: string) => {
    const config = {
      'bronze': 'bg-orange-100 text-orange-800 border-orange-200',
      'silver': 'bg-gray-100 text-gray-800 border-gray-200',
      'gold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'vip': 'bg-purple-100 text-purple-800 border-purple-200'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full border ${config[level as keyof typeof config]}`}>
        {membershipLabels[level as keyof typeof membershipLabels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'blocked': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config[status as keyof typeof config]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const calculateDaysSinceLastOrder = (dateString?: string) => {
    if (!dateString) return '주문 이력 없음';
    const lastOrder = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastOrder.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}일 전`;
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0);

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">고객 관리</h1>
            <p className="text-gray-600 mt-1">등록된 고객 정보를 관리하고 분석할 수 있습니다.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              고객 내보내기
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <UserPlus className="h-4 w-4" />
              새 고객 추가
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 고객</p>
                <p className="text-2xl font-bold text-gray-900">{totalCustomers}명</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 고객</p>
                <p className="text-2xl font-bold text-green-600">{activeCustomers}명</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 매출</p>
                <p className="text-2xl font-bold text-purple-600">{formatPrice(totalRevenue)}원</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 주문액</p>
                <p className="text-2xl font-bold text-orange-600">{formatPrice(averageOrderValue)}원</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
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
                placeholder="고객명, 이메일, 연락처로 검색..."
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
              value={selectedMembership}
              onChange={(e) => setSelectedMembership(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(membershipLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 고객 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 현황
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  등급/상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일/최근주문
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                      <div className="flex items-start text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="max-w-xs truncate" title={customer.address}>
                          {customer.address}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {customer.totalOrders}회 주문
                      </div>
                      <div className="text-sm text-gray-500">
                        총 {formatPrice(customer.totalSpent)}원
                      </div>
                      <div className="text-xs text-gray-400">
                        평균 {formatPrice(customer.totalSpent / customer.totalOrders)}원
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {getMembershipBadge(customer.membershipLevel)}
                      {getStatusBadge(customer.status)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(customer.joinDate)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        마지막 주문: {calculateDaysSinceLastOrder(customer.lastOrderDate)}
                      </div>
                      {customer.birthDate && (
                        <div className="text-xs text-gray-400 mt-1">
                          생일: {formatDate(customer.birthDate)}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="고객 상세보기"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                        title="정보 수정"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
                        title="이메일 발송"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      {customer.status !== 'blocked' && (
                        <button
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="고객 차단"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">고객이 없습니다</h3>
            <p className="mt-1 text-sm text-gray-500">검색 조건을 변경해보세요.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {filteredCustomers.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredCustomers.length}</span>명의 고객
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

      {/* 고객 분석 섹션 */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">고객 등급 분포</h3>
          <div className="space-y-3">
            {Object.entries(membershipLabels).slice(1).map(([level, label]) => {
              const count = customers.filter(c => c.membershipLevel === level).length;
              const percentage = totalCustomers > 0 ? (count / totalCustomers) * 100 : 0;
              return (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getMembershipBadge(level)}
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <div className="text-sm text-gray-900">
                    {count}명 ({percentage.toFixed(1)}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">고객 현황</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">신규 고객 (이번 달)</span>
              <span className="text-sm font-medium text-green-600">
                {customers.filter(c => {
                  const joinDate = new Date(c.joinDate);
                  const thisMonth = new Date();
                  return joinDate.getMonth() === thisMonth.getMonth() && 
                         joinDate.getFullYear() === thisMonth.getFullYear();
                }).length}명
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">재주문 고객</span>
              <span className="text-sm font-medium text-blue-600">
                {customers.filter(c => c.totalOrders > 1).length}명
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">VIP 고객</span>
              <span className="text-sm font-medium text-purple-600">
                {customers.filter(c => c.membershipLevel === 'vip').length}명
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">휴면 고객 (6개월+)</span>
              <span className="text-sm font-medium text-red-600">
                {customers.filter(c => {
                  if (!c.lastOrderDate) return true;
                  const lastOrder = new Date(c.lastOrderDate);
                  const sixMonthsAgo = new Date();
                  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                  return lastOrder < sixMonthsAgo;
                }).length}명
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomersPage;