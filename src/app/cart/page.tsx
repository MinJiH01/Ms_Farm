'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Heart, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  weight: string;
  stock: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 장바구니 데이터 로드
  useEffect(() => {
    const loadCartItems = () => {
      // 실제로는 localStorage나 API에서 가져옴
      const mockCartItems: CartItem[] = [
        {
          id: 1,
          name: '신선한 토마토',
          price: 3500,
          originalPrice: 4000,
          quantity: 2,
          image: '/images/tomato.jpg',
          weight: '1kg',
          stock: 150
        },
        {
          id: 3,
          name: '방울토마토',
          price: 4200,
          quantity: 1,
          image: '/images/cherry-tomato.jpg',
          weight: '500g',
          stock: 120
        },
        {
          id: 5,
          name: '국산 사과',
          price: 8000,
          originalPrice: 9000,
          quantity: 3,
          image: '/images/apple.jpg',
          weight: '2kg',
          stock: 45
        }
      ];

      setCartItems(mockCartItems);
      setSelectedItems(mockCartItems.map(item => item.id));
      setIsLoading(false);
    };

    loadCartItems();
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.min(newQuantity, item.stock) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    if (confirm('장바구니에서 상품을 삭제하시겠습니까?')) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length 
        ? [] 
        : cartItems.map(item => item.id)
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  // 선택된 상품들의 총액 계산
  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 30000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      alert('결제할 상품을 선택해주세요.');
      return;
    }
    
    // 실제로는 결제 페이지로 이동
    console.log('결제 진행:', selectedCartItems);
    alert('결제 페이지로 이동합니다!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">장바구니를 불러오는 중...</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">장바구니</h1>
          <p className="text-gray-600">선택한 상품을 확인하고 주문하세요</p>
        </div>

        {cartItems.length === 0 ? (
          // 빈 장바구니
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">장바구니가 비어있습니다</h2>
            <p className="text-gray-600 mb-8">신선한 농산물을 장바구니에 담아보세요!</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              쇼핑 계속하기
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 장바구니 상품 목록 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* 전체 선택 헤더 */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                        onChange={toggleSelectAll}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="font-medium text-gray-900">
                        전체 선택 ({selectedItems.length}/{cartItems.length})
                      </span>
                    </label>
                    
                    {selectedItems.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm('선택한 상품들을 삭제하시겠습니까?')) {
                            setCartItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
                            setSelectedItems([]);
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        선택 삭제
                      </button>
                    )}
                  </div>
                </div>

                {/* 상품 목록 */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start gap-4">
                        {/* 체크박스 */}
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-2"
                        />

                        {/* 상품 이미지 */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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

                        {/* 상품 정보 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                              <p className="text-sm text-gray-600">{item.weight}</p>
                              {item.stock < 10 && (
                                <p className="text-sm text-red-600 mt-1">
                                  재고 {item.stock}개 남음
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* 가격 및 수량 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">
                                {formatPrice(item.price)}원
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.originalPrice)}원
                                </span>
                              )}
                            </div>

                            {/* 수량 조절 */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 min-w-16 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <span className="text-lg font-bold text-green-600 min-w-24 text-right">
                                {formatPrice(item.price * item.quantity)}원
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 주문 요약 */}
            <div className="space-y-6">
              {/* 주문 금액 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 요약</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품 금액</span>
                    <span className="font-medium">{formatPrice(subtotal)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배송비</span>
                    <span className="font-medium">
                      {shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}
                    </span>
                  </div>
                  {subtotal < 30000 && subtotal > 0 && (
                    <p className="text-sm text-blue-600">
                      {formatPrice(30000 - subtotal)}원 더 주문하면 무료배송!
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>총 결제 금액</span>
                    <span className="text-green-600">{formatPrice(total)}원</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  주문하기 ({selectedItems.length}개)
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* 배송 안내 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-3">배송 안내</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span>평균 1-2일 배송</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span>신선도 보장</span>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    * 주말, 공휴일 제외
                    <br />
                    * 30,000원 이상 무료배송
                  </p>
                </div>
              </div>

              {/* 쇼핑 계속하기 */}
              <a
                href="/"
                className="block w-full text-center py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                쇼핑 계속하기
              </a>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;