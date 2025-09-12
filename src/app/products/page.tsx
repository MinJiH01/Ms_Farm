'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal
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
  description: string;
}

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 15000 });
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

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
      tags: ['신선', '국산', '유기농'],
      description: '햇볕을 충분히 받고 자란 달콤한 토마토입니다.'
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
      tags: ['유기농', '상추', '채소'],
      description: '농약을 사용하지 않고 재배한 신선한 상추입니다.'
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
      tags: ['방울토마토', '달콤', '간식'],
      description: '한 입에 쏙 들어가는 달콤한 방울토마토입니다.'
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
      tags: ['당근', '친환경', '베타카로틴'],
      description: '베타카로틴이 풍부한 친환경 당근입니다.'
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
      tags: ['사과', '국산', '달콤'],
      description: '아삭하고 달콤한 국산 사과입니다.'
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
      tags: ['배추', '김치', '채소'],
      description: '김치 담그기 좋은 신선한 배추입니다.'
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
      tags: ['시금치', '유기농', '철분'],
      description: '철분이 풍부한 유기농 시금치입니다.'
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
      tags: ['딸기', '달콤', '비타민C'],
      description: '당도가 높은 프리미엄 딸기입니다.'
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
      tags: ['오이', '유기농', '수분'],
      description: '수분이 풍부한 아삭한 유기농 오이입니다.'
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
      tags: ['단호박', '달콤', '베타카로틴'],
      description: '당도가 높은 달콤한 단호박입니다.'
    }
  ];

  const categories = ['all', '채소', '과일', '곡물', '견과류'];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

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
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleWishlistToggle = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: number) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전체 상품</h1>
          <p className="text-gray-600">신선한 농산물을 만나보세요</p>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 검색창 */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="상품명으로 검색..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 정렬 및 뷰모드 */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="latest">최신순</option>
                <option value="price_low">낮은 가격순</option>
                <option value="price_high">높은 가격순</option>
                <option value="rating">평점 높은순</option>
                <option value="reviews">리뷰 많은순</option>
              </select>

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

          {/* 카테고리 탭 */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? '전체' : category}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* 상품 이미지 */}
              <div className="relative aspect-square bg-gray-200 overflow-hidden">
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
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                
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
                  장바구니 담기
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">검색 결과가 없습니다</h2>
            <p className="text-gray-600">다른 검색어나 필터 조건을 시도해보세요.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;