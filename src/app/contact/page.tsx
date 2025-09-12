'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  Truck,
  CreditCard,
  User
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ContactForm {
  category: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    category: 'general',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');

  const contactCategories = [
    { id: 'general', name: '일반 문의', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'product', name: '상품 문의', icon: <User className="h-5 w-5" /> },
    { id: 'order', name: '주문/결제 문의', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'delivery', name: '배송 문의', icon: <Truck className="h-5 w-5" /> },
    { id: 'experience', name: '농장 체험 문의', icon: <MapPin className="h-5 w-5" /> }
  ];

  const faqData = [
    {
      category: '주문/결제',
      questions: [
        {
          question: '주문은 어떻게 하나요?',
          answer: '홈페이지에서 원하는 상품을 장바구니에 담고 주문서를 작성하시면 됩니다. 회원가입 없이도 주문이 가능합니다.'
        },
        {
          question: '결제 방법은 어떤 것이 있나요?',
          answer: '신용카드, 계좌이체, 무통장입금을 지원합니다. 안전한 결제를 위해 PG사를 통한 결제 시스템을 사용합니다.'
        },
        {
          question: '주문 취소는 언제까지 가능한가요?',
          answer: '상품 발송 전까지 주문 취소가 가능합니다. 마이페이지에서 직접 취소하거나 고객센터로 연락주세요.'
        }
      ]
    },
    {
      category: '배송',
      questions: [
        {
          question: '배송비는 얼마인가요?',
          answer: '30,000원 이상 주문시 무료배송, 30,000원 미만시 3,000원의 배송비가 부과됩니다.'
        },
        {
          question: '배송 기간은 어느 정도인가요?',
          answer: '주문 후 1-2일 내 발송되며, 지역에 따라 2-3일 내 도착합니다. 도서산간지역은 추가 1-2일 소요됩니다.'
        },
        {
          question: '신선도 보장은 어떻게 되나요?',
          answer: '수확 후 24시간 내 포장하여 발송하며, 냉장/냉동 포장으로 신선함을 유지합니다. 문제 시 100% 교환/환불해드립니다.'
        }
      ]
    },
    {
      category: '상품',
      questions: [
        {
          question: '유기농 인증을 받은 상품인가요?',
          answer: '대부분의 상품이 유기농 또는 무농약 인증을 받았습니다. 각 상품 페이지에서 인증서를 확인하실 수 있습니다.'
        },
        {
          question: '상품의 원산지는 어디인가요?',
          answer: '모든 상품은 국내산이며, 대부분 경상북도, 전라남도, 충청도 지역에서 재배됩니다.'
        }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // 3초 후 폼 리셋
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        category: 'general',
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">고객센터</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            궁금한 점이 있으시면 언제든지 문의해주세요. 
            빠르고 정확한 답변을 드리겠습니다.
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              문의하기
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              자주 묻는 질문
            </button>
          </div>
        </div>

        {activeTab === 'contact' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 연락처 정보 */}
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">연락처 정보</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">전화번호</h4>
                      <p className="text-gray-600">1588-1234</p>
                      <p className="text-sm text-gray-500">평일 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">이메일</h4>
                      <p className="text-gray-600">contact@msfarm.co.kr</p>
                      <p className="text-sm text-gray-500">24시간 접수</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">농장 주소</h4>
                      <p className="text-gray-600">경상북도 안동시 농장로 123</p>
                      <p className="text-sm text-gray-500">체험 프로그램 운영</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">운영시간</h4>
                      <p className="text-gray-600">평일: 09:00 - 18:00</p>
                      <p className="text-gray-600">토요일: 09:00 - 15:00</p>
                      <p className="text-sm text-red-500">일요일, 공휴일 휴무</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 빠른 문의 */}
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-6 text-black">
                <h3 className="text-xl font-bold mb-4">빠른 상담 원하시나요?</h3>
                <p className="mb-4 opacity-90">
                  전화나 카카오톡으로 빠른 상담을 받아보세요!
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-3 px-4 rounded-lg transition-colors">
                    전화 상담 신청
                  </button>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-4 rounded-lg transition-colors font-medium">
                    카카오톡 상담
                  </button>
                </div>
              </div>
            </div>

            {/* 문의 폼 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="bg-green-100 p-4 rounded-full inline-flex mb-6">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      문의가 접수되었습니다!
                    </h3>
                    <p className="text-gray-600 mb-2">
                      빠른 시일 내에 답변을 드리겠습니다.
                    </p>
                    <p className="text-sm text-gray-500">
                      영업일 기준 1-2일 내에 이메일로 회신드립니다.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">문의하기</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* 문의 유형 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          문의 유형
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {contactCategories.map(category => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                              className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                                formData.category === category.id
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
                              }`}
                            >
                              {category.icon}
                              <span className="text-sm font-medium">{category.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 개인정보 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            이름 *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="이름을 입력하세요"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            연락처
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="010-1234-5678"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          이메일 *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="이메일을 입력하세요"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          제목 *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="문의 제목을 입력하세요"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          문의 내용 *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="문의하실 내용을 자세히 적어주세요"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            전송 중...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            문의하기
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* FAQ 섹션 */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">자주 묻는 질문</h3>
              
              <div className="space-y-8">
                {faqData.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-green-600" />
                      {category.category}
                    </h4>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <div 
                          key={faqIndex}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4">
                            <h5 className="font-semibold text-gray-900 flex items-start gap-2">
                              <span className="text-green-600 font-bold">Q.</span>
                              {faq.question}
                            </h5>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 font-bold">A.</span>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  원하는 답변을 찾지 못하셨나요?
                </h4>
                <p className="text-gray-600 mb-6">
                  직접 문의해주시면 빠르게 답변해드리겠습니다.
                </p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  문의하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;