'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 인기 검색어
  const popularSearches = [
    '토마토', '유기농', '사과', '채소', '신선', 
    '딸기', '당근', '배추', '시금치', '과일'
  ];

  // 자동완성 데이터
  const autocompleteData = [
    '신선한 토마토', '토마토 주스', '방울토마토',
    '유기농 상추', '유기농 시금치', '유기농 채소',
    '국산 사과', '사과 주스', '달콤한 사과',
    '친환경 당근', '당근 주스',
    '신선한 배추', '배추김치',
    '달콤한 딸기', '딸기잼',
    '신선한 채소', '채소 세트',
    '과일 세트', '제철 과일'
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // 최근 검색어 불러오기
      const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      setRecentSearches(recent.slice(0, 5));
    }
  }, [isOpen]);

  useEffect(() => {
    // 자동완성 제안
    if (query.trim()) {
      const filtered = autocompleteData
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // 최근 검색어에 추가
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updated = [searchQuery, ...recent.filter((item: string) => item !== searchQuery)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    // 검색 페이지로 이동
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        {/* 검색 입력 */}
        <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="상품명, 카테고리, 원산지로 검색..."
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </form>

        {/* 검색 결과 영역 */}
        <div className="max-h-80 overflow-y-auto">
          {query.trim() ? (
            // 자동완성 제안
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">검색 제안</h3>
              <div className="space-y-2">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{suggestion}</span>
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => handleSearch(query)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">"{query}" 검색</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* 최근 검색어 */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">최근 검색어</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      전체 삭제
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 인기 검색어 */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  인기 검색어
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;