'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
}

const ProductGrid: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // 샘플 상품 데이터
  const products: Product[] = [
    {
      id: 1,
      name: '프리미엄 방울토마토',
      price: 12900,
      originalPrice: 15900,
      rating: 4.9,
      reviews: 1847,
      image: '🍅',
      category: '채소',
      badge: '베스트'
    },
    {
      id: 2,
      name: '유기농 상추세트',
      price: 6500,
      originalPrice: 8900,
      rating: 4.8,
      reviews: 923,
      image: '🥬',
      category: '채소',
      badge: '신상'
    },
    {
      id: 3,
      name: '햇 사과 (부사)',
      price: 15900,
      originalPrice: 19900,
      rating: 4.9,
      reviews: 2156,
      image: '🍎',
      category: '과일'
    },
    {
      id: 4,
      name: '유기농 당근',
      price: 4900,
      originalPrice: 6900,
      rating: 4.7,
      reviews: 654,
      image: '🥕',
      category: '채소'
    },
    {
      id: 5,
      name: '제주 한라봉',
      price: 24900,
      originalPrice: 32900,
      rating: 4.8,
      reviews: 1234,
      image: '🍊',
      category: '과일',
      badge: '한정'
    },
    {
      id: 6,
      name: '친환경 브로콜리',
      price: 3900,
      originalPrice: 5900,
      rating: 4.6,
      reviews: 432,
      image: '🥦',
      category: '채소'
    }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    // 장바구니 추가 로직
    console.log(`상품 ${productId} 장바구니에 추가`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            인기 상품
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            신선하고 건강한 농산물을 특별 가격으로 만나보세요
          </p>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              
              {/* 상품 이미지 영역 */}
              <div className="aspect-square bg-gray-50 rounded-t-lg p-6 flex items-center justify-center relative overflow-hidden">
                <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                
                {/* 배지 */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full text-white ${
                    product.badge === '베스트' ? 'bg-red-500' :
                    product.badge === '신상' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`}>
                    {product.badge}
                  </span>
                )}
                
                {/* 찜하기 버튼 */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    favorites.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              {/* 상품 정보 */}
              <div className="p-4">
                {/* 평점 */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>
                
                {/* 상품명 */}
                <h3 className="font-semibold text-gray-900 mb-3">
                  {product.name}
                </h3>
                
                {/* 가격 */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded font-medium">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                
                {/* 카테고리 */}
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                    {product.category}
                  </span>
                </div>
                
                {/* 장바구니 버튼 */}
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  장바구니 담기
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* 더보기 버튼 */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
            더 많은 상품 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;