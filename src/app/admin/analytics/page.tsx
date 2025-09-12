'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  BarChart3
} from 'lucide-react';

interface SalesData {
  date: string;
  sales: number;
  orders: number;
  customers: number;
}

interface ProductPerformance {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  stock: number;
  trend: 'up' | 'down' | 'stable';
}

const AdminAnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // 매출 데이터 (실제로는 API에서 가져옴)
  const salesData: SalesData[] = [
    { date: '2024-02-09', sales: 245000, orders: 12, customers: 8 },
    { date: '2024-02-10', sales: 320000, orders: 18, customers: 14 },
    { date: '2024-02-11', sales: 180000, orders: 9, customers: 7 },
    { date: '2024-02-12', sales: 420000, orders: 25, customers: 19 },
    { date: '2024-02-13', sales: 380000, orders: 22, customers: 16 },
    { date: '2024-02-14', sales: 510000, orders: 31, customers: 23 },
    { date: '2024-02-15', sales: 290000, orders: 16, customers: 12 }
  ];

  // 상품 성과 데이터
  const productPerformance: ProductPerformance[] = [
    {
      id: 1,
      name: '신선한 토마토',
      category: '채소',
      sales: 245,
      revenue: 857500,
      stock: 150,
      trend: 'up'
    },
    {
      id: 5,
      name: '국산 사과',
      category: '과일',
      sales: 189,
      revenue: 1512000,
      stock: 45,
      trend: 'up'
    },
    {
      id: 2,
      name: '유기농 상추',
      category: '채소',
      sales: 123,
      revenue: 344400,
      stock: 80,
      trend: 'stable'
    },
    {
      id: 4,
      name: '친환경 당근',
      category: '채소',
      sales: 167,
      revenue: 417500,
      stock: 200,
      trend: 'up'
    },
    {
      id: 3,
      name: '방울토마토',
      category: '채소',
      sales: 89,
      revenue: 373800,
      stock: 0,
      trend: 'down'
    }
  ];

  // 통계 계산
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const totalCustomers = salesData.reduce((sum, day) => sum + day.customers, 0);
  const averageOrderValue = totalSales / totalOrders;

  // 전주 대비 성장률 (임시 데이터)
  const salesGrowth = 12.5;
  const ordersGrowth = 8.3;
  const customersGrowth = 15.2;
  const aovGrowth = 3.8;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'up' || value > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === 'down' || value < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <div className="h-4 w-4" />;
  };

  const getGrowthColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">통계 및 분석</h1>
            <p className="text-gray-600 mt-1">매출, 주문, 고객 데이터를 분석하고 인사이트를 얻으세요.</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="week">최근 7일</option>
              <option value="month">최근 30일</option>
              <option value="quarter">최근 3개월</option>
              <option value="year">최근 1년</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="h-4 w-4" />
              새로고침
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              리포트 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            {getTrendIcon('up', salesGrowth)}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">총 매출</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(totalSales)}원</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${getGrowthColor(salesGrowth)}`}>
                +{salesGrowth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">전주 대비</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            {getTrendIcon('up', ordersGrowth)}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">총 주문</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}건</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${getGrowthColor(ordersGrowth)}`}>
                +{ordersGrowth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">전주 대비</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            {getTrendIcon('up', customersGrowth)}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">구매 고객</p>
            <p className="text-2xl font-bold text-gray-900">{totalCustomers}명</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${getGrowthColor(customersGrowth)}`}>
                +{customersGrowth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">전주 대비</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            {getTrendIcon('up', aovGrowth)}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">평균 주문액</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(averageOrderValue)}원</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${getGrowthColor(aovGrowth)}`}>
                +{aovGrowth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">전주 대비</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 매출 트렌드 차트 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">매출 트렌드</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              최근 7일
            </div>
          </div>
          
          {/* 간단한 막대 차트 */}
          <div className="space-y-4">
            {salesData.map((data, index) => {
              const maxSales = Math.max(...salesData.map(d => d.sales));
              const barWidth = (data.sales / maxSales) * 100;
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-xs text-gray-600">
                    {formatDate(data.date)}
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-end pr-2 transition-all duration-300"
                        style={{ width: `${barWidth}%` }}
                      >
                        <span className="text-xs font-medium text-white">
                          {formatPrice(data.sales)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 text-xs text-gray-600 text-right">
                    {data.orders}건
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 인기 상품 순위 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">인기 상품 TOP 5</h3>
            <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
              <Eye className="h-4 w-4" />
              전체보기
            </button>
          </div>
          
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    {getTrendIcon(product.trend, 0)}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900">{product.sales}개</p>
                  <p className="text-sm text-gray-500">{formatPrice(product.revenue)}원</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리별 매출 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">카테고리별 매출</h3>
          
          <div className="space-y-4">
            {[
              { name: '채소', sales: 1250000, percentage: 45, color: 'bg-green-500' },
              { name: '과일', sales: 980000, percentage: 35, color: 'bg-orange-500' },
              { name: '곡물', sales: 420000, percentage: 15, color: 'bg-yellow-500' },
              { name: '기타', sales: 140000, percentage: 5, color: 'bg-gray-500' }
            ].map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-600">{formatPrice(category.sales)}원</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주요 지표 요약 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">주요 지표 요약</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">매출 성장률</p>
                  <p className="text-sm text-gray-600">전월 대비</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">+24.5%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">재방문율</p>
                  <p className="text-sm text-gray-600">기존 고객 비율</p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600">68.2%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">재고 회전율</p>
                  <p className="text-sm text-gray-600">월 평균</p>
                </div>
              </div>
              <span className="text-lg font-bold text-purple-600">3.2회</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">전환율</p>
                  <p className="text-sm text-gray-600">방문자 → 구매자</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-600">12.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 인사이트 및 추천 */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 인사이트 & 추천사항</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-white/50">
            <h4 className="font-medium text-green-700 mb-2">📈 성장 기회</h4>
            <p className="text-sm text-gray-600">
              과일 카테고리가 35%의 높은 매출 비중을 차지하고 있습니다. 
              계절 과일 상품을 확대하면 더 큰 성장을 기대할 수 있습니다.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-white/50">
            <h4 className="font-medium text-orange-700 mb-2">⚠️ 주의사항</h4>
            <p className="text-sm text-gray-600">
              방울토마토의 재고가 부족하여 매출이 감소하고 있습니다. 
              인기 상품의 재고 관리를 강화해야 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;