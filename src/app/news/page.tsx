'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Eye,
  TrendingUp,
  ChevronRight,
  Search
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: number;
  views: number;
  tags: string[];
  featured: boolean;
}

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: '전체', count: 12 },
    { id: 'farm', name: '농장소식', count: 5 },
    { id: 'cultivation', name: '재배정보', count: 3 },
    { id: 'health', name: '건강정보', count: 2 },
    { id: 'event', name: '이벤트', count: 2 }
  ];

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: '봄철 토마토 수확이 시작되었습니다',
      excerpt: '올해 첫 토마토 수확이 시작되었습니다. 겨울 동안 정성껏 키운 토마토들이 빨갛게 익어가고 있어요.',
      content: '상세 내용...',
      image: '/images/tomato.jpg',
      category: 'farm',
      author: '김농부',
      publishDate: '2024-03-15',
      readTime: 3,
      views: 245,
      tags: ['토마토', '수확', '봄철'],
      featured: true
    },
    {
      id: 2,
      title: '유기농 재배법: 친환경 병충해 방제',
      excerpt: '화학 농약 없이도 건강한 작물을 키울 수 있는 친환경 병충해 방제 방법을 소개합니다.',
      content: '상세 내용...',
      image: '/images/lettuce.jpg',
      category: 'cultivation',
      author: '이농부',
      publishDate: '2024-03-10',
      readTime: 5,
      views: 189,
      tags: ['유기농', '친환경', '병충해'],
      featured: true
    },
    {
      id: 3,
      title: '봄나물의 영양학적 효과와 조리법',
      excerpt: '봄철 대표 나물들의 영양소와 건강에 미치는 효과, 그리고 맛있게 조리하는 방법을 알아보세요.',
      content: '상세 내용...',
      image: '/images/spinach.jpg',
      category: 'health',
      author: '박영양사',
      publishDate: '2024-03-08',
      readTime: 4,
      views: 156,
      tags: ['봄나물', '영양', '요리'],
      featured: false
    },
    {
      id: 4,
      title: '3월 할인 이벤트 - 신선채소 20% 할인',
      excerpt: '3월 한 달간 신선한 채소류를 20% 할인된 가격으로 만나보세요. 기간 한정 특가!',
      content: '상세 내용...',
      image: '/images/cabbage.jpg',
      category: 'event',
      author: 'MS농장',
      publishDate: '2024-03-01',
      readTime: 2,
      views: 312,
      tags: ['할인', '이벤트', '채소'],
      featured: true
    },
    {
      id: 5,
      title: '딸기 수확 체험 프로그램 운영',
      excerpt: '가족과 함께 즐길 수 있는 딸기 수확 체험 프로그램을 운영합니다. 달콤한 추억을 만들어보세요.',
      content: '상세 내용...',
      image: '/images/strawberry.jpg',
      category: 'event',
      author: 'MS농장',
      publishDate: '2024-02-28',
      readTime: 3,
      views: 278,
      tags: ['체험', '딸기', '가족'],
      featured: false
    },
    {
      id: 6,
      title: '겨울철 시설재배 현황 보고',
      excerpt: '추운 겨울에도 신선한 채소를 공급하기 위한 우리 농장의 시설재배 현황을 공유합니다.',
      content: '상세 내용...',
      image: '/images/cucumber.jpg',
      category: 'farm',
      author: '최농부',
      publishDate: '2024-02-25',
      readTime: 4,
      views: 134,
      tags: ['시설재배', '겨울철', '채소'],
      featured: false
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryColor = (categoryId: string) => {
    const colors: { [key: string]: string } = {
      farm: 'bg-green-100 text-green-800',
      cultivation: 'bg-blue-100 text-blue-800',
      health: 'bg-purple-100 text-purple-800',
      event: 'bg-red-100 text-red-800'
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">농장 소식</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MS농장의 최신 소식과 농업 정보, 건강한 먹거리 이야기를 전해드립니다.
          </p>
        </div>

        {/* 메인 피처 기사 */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* 이미지 */}
                <div className="relative h-80 lg:h-auto">
                  <img
                    src={featuredArticles[0].image}
                    alt={featuredArticles[0].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 items-center justify-center hidden">
                    <span className="text-gray-500 text-lg">{featuredArticles[0].title}</span>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredArticles[0].category)}`}>
                      {getCategoryName(featuredArticles[0].category)}
                    </span>
                  </div>
                </div>

                {/* 내용 */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredArticles[0].publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredArticles[0].readTime}분 읽기
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredArticles[0].views}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticles[0].title}
                  </h2>
                  
                  <p className="text-gray-600 text-lg mb-6">
                    {featuredArticles[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{featuredArticles[0].author}</span>
                    </div>
                    
                    <Link
                      href={`/news/${featuredArticles[0].id}`}
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      자세히 보기
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* 검색 */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">검색</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="제목, 내용, 태그로 검색..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 카테고리 */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-green-100 text-green-700'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 인기 태그 */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 태그</h3>
                <div className="flex flex-wrap gap-2">
                  {['토마토', '유기농', '건강', '이벤트', '체험', '수확', '재배', '영양'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* 이미지 */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 items-center justify-center hidden">
                      <span className="text-gray-500 text-sm">{article.title}</span>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {getCategoryName(article.category)}
                      </span>
                    </div>

                    {article.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        추천
                      </div>
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}분
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{article.author}</span>
                      </div>
                      
                      <Link
                        href={`/news/${article.id}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                      >
                        더보기 <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">검색 결과가 없습니다</h2>
                <p className="text-gray-600">다른 검색어나 카테고리를 시도해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;