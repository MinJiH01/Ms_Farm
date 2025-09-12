import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 메인 푸터 콘텐츠 */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">MS농장</h3>
                <p className="text-sm text-gray-400">신선한 농산물</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              건강한 땅에서 자란 신선한 농산물을 직접 재배하여 고객님의 식탁까지 안전하게 전달합니다.
            </p>
            
            {/* 소셜 미디어 */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* 쇼핑 */}
          <div>
            <h4 className="font-semibold mb-4">쇼핑하기</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">신선 채소</a></li>
              <li><a href="#" className="hover:text-white transition-colors">프리미엄 과일</a></li>
              <li><a href="#" className="hover:text-white transition-colors">유기농 식품</a></li>
              <li><a href="#" className="hover:text-white transition-colors">제철 특산물</a></li>
              <li><a href="#" className="hover:text-white transition-colors">특가 상품</a></li>
            </ul>
          </div>
          
          {/* 고객 지원 */}
          <div>
            <h4 className="font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white transition-colors">주문 및 배송</a></li>
              <li><a href="#" className="hover:text-white transition-colors">교환 및 환불</a></li>
              <li><a href="#" className="hover:text-white transition-colors">고객센터</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용 가이드</a></li>
            </ul>
          </div>
          
          {/* 연락처 */}
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>1588-1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contact@msfarm.co.kr</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>경북 안동시 농업로 123</span>
              </div>
            </div>
            
            {/* 영업시간 */}
            <div className="mt-6">
              <h5 className="font-medium mb-2">고객센터 운영시간</h5>
              <div className="text-sm text-gray-400 space-y-1">
                <div>평일: 09:00 - 18:00</div>
                <div>토요일: 09:00 - 15:00</div>
                <div>일요일 및 공휴일 휴무</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 하단 정보 */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© 2025 MS농장. All rights reserved.</p>
              <p>사업자등록번호: 123-45-67890 | 통신판매업신고번호: 2025-경북안동-0123</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">사이트맵</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;