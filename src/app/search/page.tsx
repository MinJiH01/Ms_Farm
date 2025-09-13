'use client';

import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 검색 기능을 담당하는 별도 컴포넌트
import SearchContent from './SearchContent';

const SearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">검색 중...</p>
            </div>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>

      <Footer />
    </div>
  );
};

export default SearchPage;