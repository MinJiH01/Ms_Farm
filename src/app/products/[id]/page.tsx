'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  Share2,
  MessageCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  category: string;
  origin: string;
  weight: string;
  stock: number;
  tags: string[];
  features: string[];
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 상품 데이터 로드 (실제로는 API에서 가져옴)
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // 임시 데이터
        const productData: Product = {
          id: parseInt(productId),
          name: '신선한 토마토',
          price: 3500,
          originalPrice: 4000,
          rating: 4.5,
          reviews: 128,
          images: [
            '/images/tomato1.jpg',
            '/images/tomato2.jpg', 
            '/images/tomato3.jpg',
            '/images/tomato4.jpg'
          ],
          description: `농장에서 직접 재배한 신선하고 달콤한 토마토입니다. 
          
비타민 C가 풍부하며, 리코펜 성분이 항산화 효과를 제공합니다. 
샐러드, 요리, 주스 등 다양한 용도로 사용하실 수 있습니다.

- 100% 국산 토마토
- 농약 없이 친환경 재배
- 당도 높은 프리미엄 품종
- 신선도 보장 직송 배송`,
          category: '채소',
          origin: '경상북도',
          weight: '1kg (약 8-10개)',
          stock: 150,
          tags: ['신선', '국산', '유기농', '비타민C', '리코펜'],
          features: [
            '신선 보장 - 수확 후 24시간 내 배송',
            '친환경 재배 - 농약 사용 없음',
            '높은 당도 - Brix 6.5 이상',
            '영양 풍부 - 비타민 C, 리코펜 함유'
          ]
        };

        const reviewData: Review[] = [
          {
            id: 1,
            userName: '김**',
            rating: 5,
            comment: '정말 신선하고 달아요! 아이들도 잘 먹네요. 다음에도 주문할게요.',
            date: '2024-02-10',
            helpful: 15
          },
          {
            id: 2,
            userName: '이**',
            rating: 4,
            comment: '토마토가 크고 맛있어요. 배송도 빨랐습니다.',
            date: '2024-02-08',
            helpful: 8
          },
          {
            id: 3,
            userName: '박**',
            rating: 5,
            comment: '유기농이라서 안심하고 먹을 수 있어요. 품질 좋습니다!',
            date: '2024-02-05',
            helpful: 12
          }
        ];

        setProduct(productData);
        setReviews(reviewData);
      } catch (error) {
        console.error('상품 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    if (!product) return;
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // 장바구니에 상품 추가 (실제로는 API 호출 또는 Context 사용)
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantity,
      image: product.images[0],
      weight: product.weight,
      stock: product.stock
    };
    
    // localStorage에 장바구니 저장 (임시)
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    alert(`${product.name} ${quantity}개가 장바구니에 추가되었습니다!`);
    
    // 헤더의 장바구니 카운트 업데이트를 위해 이벤트 발생
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleBuyNow = () => {
    if (!product) return;
    console.log('바로 구매:', { productId: product.id, quantity });
    // 실제로는 결제 페이지로 이동
    alert('결제 페이지로 이동합니다!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const calculateDiscount = () => {
    if (!product?.originalPrice) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">상품을 찾을 수 없습니다.</p>
            <a href="/" className="text-green-600 hover:text-green-700">
              메인 페이지로 돌아가기
            </a>
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
        {/* 상품 상세 정보 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* 상품 이미지 */}
            <div>
              {/* 메인 이미지 */}
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">상품 이미지 {selectedImageIndex + 1}</span>
                </div>
              </div>
              
              {/* 썸네일 이미지들 */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-green-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                      <span className="text-xs text-gray-400">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 상품 정보 */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full mb-2">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              </div>

              {/* 평점 및 리뷰 */}
              <div className="flex items-center gap-4 mb-6">
                {renderStars(product.rating)}
                <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                <span className="text-gray-500">({product.reviews}개 리뷰)</span>
              </div>

              {/* 가격 */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}원
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}원
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                        {calculateDiscount()}% 할인
                      </span>
                    </>
                  )}
                </div>
                <p className="text-gray-600">배송비 3,000원 (30,000원 이상 무료배송)</p>
              </div>

              {/* 상품 정보 */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 w-16">원산지</span>
                  <span className="font-medium">{product.origin}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 w-16">중량</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 w-16">재고</span>
                  <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock}개 남음
                  </span>
                </div>
              </div>

              {/* 수량 선택 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 min-w-16 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    총 {formatPrice(product.price * quantity)}원
                  </span>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    장바구니
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 border-2 rounded-lg transition-colors ${
                      isWishlisted
                        ? 'border-red-500 text-red-600 bg-red-50'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                
                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  바로 구매
                </button>
              </div>

              {/* 배송 안내 */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>평균 1-2일 배송 (주말, 공휴일 제외)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>신선도 보장 - 문제시 100% 환불</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="h-5 w-5 text-green-600" />
                  <span>배송 후 7일 이내 교환/환불 가능</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 상세 탭 */}
        <div className="bg-white rounded-xl shadow-sm mt-8 overflow-hidden">
          {/* 탭 헤더 */}
          <div className="border-b">
            <nav className="flex">
              {[
                { id: 'description', name: '상품설명' },
                { id: 'features', name: '상품특징' },
                { id: 'reviews', name: `리뷰 (${reviews.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-green-500 text-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* 탭 내용 */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {product.description}
                </div>
                
                {product.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">태그</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">상품 특징</h3>
                <div className="space-y-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold">✓</span>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">고객 리뷰</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {renderStars(product.rating)}
                      <span className="font-medium text-gray-900">{product.rating}</span>
                      <span className="text-gray-500">({reviews.length}개 리뷰)</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    리뷰 쓰기
                  </button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          {renderStars(review.rating, 'sm')}
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          도움됨 {review.helpful}
                        </button>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;