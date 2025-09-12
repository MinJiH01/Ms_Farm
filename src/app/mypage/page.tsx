'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  Heart, 
  Settings,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Star,
  Clock,
  Truck
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface UserData {
  email: string;
  name: string;
  loginTime: string;
}

interface RecentOrder {
  id: number;
  date: string;
  status: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const MyPage: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      
      // 최근 주문 내역 로드 (임시 데이터)
      const mockOrders: RecentOrder[] = [
        {
          id: 1001,
          date: '2024-03-15',
          status: '배송중',
          totalAmount: 15700,
          items: [
            { name: '신선한 토마토', quantity: 2, price: 3500 },
            { name: '국산 사과', quantity: 1, price: 8000 }
          ]
        },
        {
          id: 1002,
          date: '2024-03-10',
          status: '배송완료',
          totalAmount: 23400,
          items: [
            { name: '유기농 상추', quantity: 3, price: 2800 },
            { name: '달콤한 딸기', quantity: 1, price: 12000 }
          ]
        }
      ];
      
      setRecentOrders(mockOrders);
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
      router.push('/login');
    }
  }, [router]);

  const menuItems = [
    {
      title: '주문내역',
      description: '주문한 상품의 배송 상태를 확인하세요',
      icon: <Package className="h-6 w-6" />,
      href: '/mypage/orders',
      color: 'bg-blue-500'
    },
    {
      title: '찜한 상품',
      description: '관심 있는 상품들을 모아보세요',
      icon: <Heart className="h-6 w-6" />,
      href: '/mypage',
      color: 'bg-red-500'
    },
    {
      title: '계정설정',
      description: '개인정보 및 비밀번호를 변경하세요',
      icon: <Settings className="h-6 w-6" />,
      href: '/mypage/profile',
      color: 'bg-gray-500'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 사용자 프로필 섹션 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user.name}님, 안녕하세요!
              </h1>
              <p className="text-gray-600 mb-4">
                신선한 농산물과 함께하는 건강한 하루 되세요.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  마지막 로그인: {formatDate(user.loginTime)}
                </div>
              </div>
            </div>
            
            <Link
              href="/mypage/profile"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              프로필 수정
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 메뉴 */}
          <div className="lg:col-span-2">
            {/* 빠른 메뉴 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">빠른 메뉴</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
                  >
                    <div className={`${item.color} text-white p-3 rounded-lg inline-flex mb-4 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      바로가기 <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 최근 주문 내역 */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">최근 주문 내역</h2>
                <Link
                  href="/mypage/orders"
                  className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                >
                  전체보기 <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-gray-900">
                          주문번호 #{order.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                        <div className="font-semibold text-gray-900">
                          {formatPrice(order.totalAmount)}원
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-gray-900 font-medium">
                            {formatPrice(item.price * item.quantity)}원
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                      <Link
                        href={`/mypage/orders/${order.id}`}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        상세보기
                      </Link>
                    </div>
                  </div>
                ))}

                {recentOrders.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      주문 내역이 없습니다
                    </h3>
                    <p className="text-gray-600 mb-6">
                      신선한 농산물을 주문해보세요!
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      상품 둘러보기 <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 배송지 정보 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 배송지</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">집</div>
                    <div className="text-gray-600">서울시 강남구 테헤란로 123</div>
                    <div className="text-gray-600">아파트 101동 1001호</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">010-1234-5678</span>
                </div>
              </div>
              <Link
                href="/mypage"
                className="block w-full text-center mt-4 py-2 text-green-600 hover:text-green-700 font-medium text-sm border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                배송지 관리
              </Link>
            </div>

            {/* 결제 수단 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">등록된 결제수단</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    BC
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">BC카드 ****-1234</div>
                    <div className="text-gray-600">기본 결제수단</div>
                  </div>
                </div>
              </div>
              <Link
                href="/mypage"
                className="block w-full text-center mt-4 py-2 text-green-600 hover:text-green-700 font-medium text-sm border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                결제수단 관리
              </Link>
            </div>

            {/* 고객 등급 */}
            <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-6 text-black">
              <h3 className="text-lg font-semibold mb-2">고객 등급</h3>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">실버 회원</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                다음 등급까지 50,000원 남았어요!
              </p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>

            {/* 공지사항 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">공지사항</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3">
                  <div className="text-sm font-medium text-gray-900">
                    3월 할인 이벤트 진행중
                  </div>
                  <div className="text-xs text-gray-500">2024.03.01</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <div className="text-sm font-medium text-gray-900">
                    배송비 정책 변경 안내
                  </div>
                  <div className="text-xs text-gray-500">2024.02.28</div>
                </div>
              </div>
              <Link
                href="/news"
                className="block w-full text-center mt-4 py-2 text-green-600 hover:text-green-700 font-medium text-sm"
              >
                더 많은 소식 보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyPage;