'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  X, 
  Grid, 
  List,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart
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
  image: string;
  category: string;
  origin: string;
  stock: number;
  tags: string[];
}

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [appliedQuery, setAppliedQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // 전체 상품 데이터 (실제로는 API에서 가져옴)
  const allProducts: Product[] = [
    {
      id: 1,
      name: '신선한 토마토',
      price: 3500,
      originalPrice: 4000,
      rating: 4.5,
      reviews: 128,
      image: '/images/tomato.jpg',
      category: '채소',
      origin: '경상북도',
      stock: 150,
      tags: ['신선', '국산', '유기농', '토마토', '비타민C']
    },
    {
      id: 2,
      name: '유기농 상추',
      price: 2800,
      rating: 4.2,
      reviews: 95,
      image: '/images/lettuce.jpg',
      category: '채소',
      origin: '전라남도',
      stock: 80,
      tags: ['유기농', '상추', '채소', '신선', '샐러드']
    },
    {
      id: 3,
      name: '방울토마토',
      price: 4200,
      originalPrice: 4800,
      rating: 4.7,
      reviews: 156,
      image: '/images/cherry-tomato.jpg',
      category: '채소',
      origin: '충청북도',
      stock: 120,
      tags: ['방울토마토', '달콤', '간식', '비타민', '미니토마토']
    },
    {
      id: 4,
      name: '친환경 당근',
      price: 2500,
      rating: 4.3,
      reviews: 78,
      image: '/images/carrot.jpg',
      category: '채소',
      origin: '강원도',
      stock: 200,
      tags: ['당근', '친환경', '베타카로틴', '뿌리채소']
    },
    {
      id: 5,
      name: '국산 사과',
      price: 8000,
      originalPrice: 9000,
      rating: 4.8,
      reviews: 203,
      image: '/images/apple.jpg',
      category: '과일',
      origin: '경상북도',
      stock: 45,
      tags: ['사과', '국산', '달콤', '아삭', '과일']
    },
    {
      id: 6,
      name: '신선한 배추',
      price: 3200,
      rating: 4.1,
      reviews: 67,
      image: '/images/cabbage.jpg',
      category: '채소',
      origin: '전라남도',
      stock: 90,
      tags: ['배추', '김치', '채소', '신선', '잎채소']
    },
    {
      id: 7,
      name: '유기농 시금치',
      price: 3800,
      originalPrice: 4200,
      rating: 4.4,
      reviews: 89,
      image: '/images/spinach.jpg',
      category: '채소',
      origin: '충청남도',
      stock: 110,
      tags: ['시금치', '유기농', '철분', '엽산', '녹색채소']
    },
    {
      id: 8,
      name: '달콤한 딸기',
      price: 12000,
      originalPrice: 14000,
      rating: 4.9,
      reviews: 245,
      image: '/images/strawberry.jpg',
      category: '과일',
      origin: '경상남도',
      stock: 60,
      tags: ['딸기', '달콤', '비타민C', '디저트', '과일']
    },
    {
      id: 9,
      name: '유기농 오이',
      price: 2200,
      rating: 4.0,
      reviews: 54,
      image: '/images/cucumber.jpg',
      category: '채소',
      origin: '경기도',
      stock: 130,
      tags: ['오이', '유기농', '수분', '시원', '샐러드']
    },
    {
      id: 10,
      name: '달콤한 단호박',
      price: 4500,
      rating: 4.6,
      reviews: 112,
      image: '/images/pumpkin.jpg',
      category: '채소',
      origin: '전라북도',
      stock: 75,
      tags: ['단호박', '달콤', '베타카로틴', '영양', '찜']
    }
  ];

  const categories = ['all', '채소', '과일', '곡물', '견과류'];

  // 검색 및 필터링 로직
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // 검색어 필터링
    if (appliedQuery.trim()) {
      const query = appliedQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query)
      );
    }

    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 가격 범위 필터링
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // 정렬
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance
        break;
    }

    return filtered;
  }, [appliedQuery, selectedCategory, priceRange, sortBy]);

  const handleSearch = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedQuery(searchQuery);
    
    // URL 업데이트
    const url = new URL(window.location.href);
    if (searchQuery.trim()) {
      url.searchParams.set('q', searchQuery);
    } else {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url.toString());
  }, [searchQuery]);

  const handleWishlistToggle = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: number) => {
    console.log('장바구니에 추가:', productId);
    alert('장바구니에 추가되었습니다!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const highlightSearchTerm = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 헤더 */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* 검색 폼 */}
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="상품명, 카테고리, 원산지로 검색..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Search className="h-5 w-5 text-green-600 hover:text-green-700" />
                </button>
              </form>
            </div>

            {/* 뷰 모드 및 필터 토글 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <SlidersHorizontal className="h-5 w-5" />
                필터
              </button>
            </div>
          </div>

          {/* 검색 결과 정보 */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              {appliedQuery ? (
                <p className="text-lg">
                  '<span className="font-semibold text-green-600">{appliedQuery}</span>' 검색 결과{' '}
                  <span className="text-gray-600">({filteredProducts.length}개)</span>
                </p>
              ) : (
                <p className="text-lg">
                  전체 상품 <span className="text-gray-600">({filteredProducts.length}개)</span>
                </p>
              )}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="relevance">관련도순</option>
              <option value="price_low">낮은 가격순</option>
              <option value="price_high">높은 가격순</option>
              <option value="rating">평점 높은순</option>
              <option value="reviews">리뷰 많은순</option>
              <option value="name">이름순</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 필터 */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">필터</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 카테고리 필터 */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">카테고리</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        {category === 'all' ? '전체' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 가격 범위 필터 */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">가격 범위</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">최소 가격</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">최대 가격</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[5000, 10000, 20000].map(price => (
                      <button
                        key={price}
                        onClick={() => setPriceRange({ min: 0, max: price })}
                        className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
                      >
                        ~{formatPrice(price)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 필터 초기화 */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 20000 });
                  setSortBy('relevance');
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                필터 초기화
              </button>
            </div>
          </div>

          {/* 상품 목록 */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">검색 결과가 없습니다</h2>
                <p className="text-gray-600 mb-8">다른 검색어로 다시 시도해보세요.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setAppliedQuery('');
                    setSelectedCategory('all');
                    setPriceRange({ min: 0, max: 20000 });
                  }}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  전체 상품 보기
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
              }>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* 상품 이미지 */}
                    <div className={`relative bg-gray-200 overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-square'
                    }`}>
                      <a href={`/products/${product.id}`} className="block h-full">
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
                      </a>
                      
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleWishlistToggle(product.id)}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                          wishlist.includes(product.id)
                            ? 'bg-red-100 text-red-500'
                            : 'bg-white text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* 상품 정보 */}
                    <div className="p-4 flex-1">
                      <a href={`/products/${product.id}`} className="block">
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                          {highlightSearchTerm(product.name, appliedQuery)}
                        </h3>
                      </a>
                      
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}원
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}원
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {product.category}
                        </span>
                        <span className="ml-2">{product.origin}</span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        장바구니
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;