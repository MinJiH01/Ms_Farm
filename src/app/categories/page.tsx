'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  Apple, 
  Wheat, 
  Nut,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  productCount: number;
  color: string;
  featured: boolean;
  subcategories?: string[];
}

interface FeaturedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const CategoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categories: Category[] = [
    {
      id: 1,
      name: '채소류',
      slug: 'vegetables',
      description: '신선하고 건강한 채소들을 만나보세요',
      image: '/images/lettuce.jpg',
      icon: <Leaf className="h-8 w-8" />,
      productCount: 45,
      color: 'bg-green-500',
      featured: true,
      subcategories: ['잎채소', '뿌리채소', '열매채소', '줄기채소']
    },
    {
      id: 2,
      name: '과일류',
      slug: 'fruits',
      description: '달콤하고 영양 가득한 제철 과일',
      image: '/images/apple.jpg',
      icon: <Apple className="h-8 w-8" />,
      productCount: 28,
      color: 'bg-red-500',
      featured: true,
      subcategories: ['사과', '배', '딸기', '포도', '감귤류']
    },
    {
      id: 3,
      name: '곡물류',
      slug: 'grains',
      description: '건강한 곡물과 잡곡류',
      image: '/images/pumpkin.jpg',
      icon: <Wheat className="h-8 w-8" />,
      productCount: 18,
      color: 'bg-amber-500',
      featured: false,
      subcategories: ['쌀', '현미', '잡곡', '보리', '콩류']
    },
    {
      id: 4,
      name: '견과류',
      slug: 'nuts',
      description: '고소하고 영양 가득한 견과류',
      image: '/images/carrot.jpg',
      icon: <Nut className="h-8 w-8" />,
      productCount: 15,
      color: 'bg-orange-500',
      featured: false,
      subcategories: ['아몬드', '호두', '땅콩', '밤', '잣']
    }
  ];

  const featuredProducts: FeaturedProduct[] = [
    {
      id: 1,
      name: '신선한 토마토',
      price: 3500,
      image: '/images/tomato.jpg',
      rating: 4.5,
      category: '채소류'
    },
    {
      id: 2,
      name: '국산 사과',
      price: 8000,
      image: '/images/apple.jpg',
      rating: 4.8,
      category: '과일류'
    },
    {
      id: 3,
      name: '유기농 상추',
      price: 2800,
      image: '/images/lettuce.jpg',
      rating: 4.2,
      category: '채소류'
    },
    {
      id: 4,
      name: '달콤한 딸기',
      price: 12000,
      image: '/images/strawberry.jpg',
      rating: 4.9,
      category: '과일류'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">상품 카테고리</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            신선한 농산물을 카테고리별로 만나보세요. 
            우리 농장에서 직접 재배한 건강한 먹거리들입니다.
          </p>
        </div>

        {/* 메인 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              {/* 카테고리 이미지 */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 items-center justify-center hidden">
                  <span className="text-gray-500 text-sm">{category.name}</span>
                </div>

                {/* 카테고리 아이콘 */}
                <div className={`absolute top-4 left-4 ${category.color} text-white p-3 rounded-full shadow-lg`}>
                  {category.icon}
                </div>

                {/* 인기 카테고리 배지 */}
                {category.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    인기
                  </div>
                )}

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* 카테고리 정보 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">
                    {category.productCount}개 상품
                  </span>
                  <Link 
                    href={`/products?category=${category.slug}`}
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                  >
                    보러가기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* 서브카테고리 (호버시 표시) */}
                {selectedCategory === category.id && category.subcategories && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-green-100 hover:text-green-700 cursor-pointer transition-colors"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 카테고리별 추천 상품 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">카테고리 추천 상품</h2>
            <p className="text-gray-600">각 카테고리에서 가장 인기 있는 상품들을 만나보세요</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 items-center justify-center hidden">
                    <span className="text-gray-500 text-sm">{product.name}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-green-600 font-medium">
                      {product.category}
                    </span>
                    {renderStars(product.rating)}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}원
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              전체 상품 보기
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* 카테고리 소개 섹션 */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl overflow-hidden">
          <div className="px-8 py-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">MS농장만의 특별함</h2>
              <p className="text-lg mb-8 opacity-90">
                직접 재배한 신선한 농산물을 카테고리별로 정성껏 분류했습니다. 
                각 카테고리마다 최고 품질의 상품들만을 엄선하여 제공합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 inline-flex mb-4">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">친환경 재배</h3>
                  <p className="opacity-90">농약 사용을 최소화한 건강한 농산물</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 inline-flex mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">품질 보증</h3>
                  <p className="opacity-90">엄격한 품질 관리로 최상의 상품만 선별</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 inline-flex mb-4">
                    <Star className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">신선 보장</h3>
                  <p className="opacity-90">수확 후 즉시 포장하여 신선함 유지</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CategoriesPage;