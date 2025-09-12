import React from 'react';
import { ArrowRight, Star, Truck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* 왼쪽 콘텐츠 */}
          <div className="lg:col-span-6">
            <div className="text-center lg:text-left">
              
              {/* 배지 */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
                <Star className="w-4 h-4 mr-2" />
                평점 4.9 · 1,000+ 고객 만족
              </div>
              
              {/* 메인 헤드라인 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                농장에서 <span className="text-green-600">직송</span>하는<br />
                신선한 농산물
              </h1>
              
              {/* 설명 */}
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl">
                매일 아침 수확한 신선한 채소와 과일을 당일 배송으로 받아보세요. 
                건강한 식탁의 시작은 MS농장과 함께입니다.
              </p>
              
              {/* 특징 */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  유기농 인증
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  당일 수확
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  신선 보장
                </div>
              </div>
              
              {/* CTA 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                  지금 주문하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition-colors">
                  상품 둘러보기
                </button>
              </div>
              
              {/* 배송 정보 */}
              <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-gray-600">
                <Truck className="w-4 h-4 mr-2 text-green-600" />
                오늘 주문시 내일 새벽 배송
              </div>
            </div>
          </div>
          
          {/* 오른쪽 이미지 */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl shadow-2xl flex items-center justify-center">
                {/* 임시 이미지 - 실제로는 농장 이미지를 넣으면 됩니다 */}
                <div className="text-center">
                  <div className="text-8xl lg:text-9xl mb-4">🥕</div>
                  <div className="text-2xl text-gray-700 font-medium">신선한 농산물</div>
                </div>
              </div>
              
              {/* 플로팅 카드들 */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">유기농</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24H</div>
                  <div className="text-sm text-gray-600">신선배송</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;