'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Calendar,
  Check,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: 'male' | 'female' | '';
  agreements: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  };
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: '',
    agreements: {
      terms: false,
      privacy: false,
      marketing: false
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [emailChecked, setEmailChecked] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('agreements.')) {
        const agreementKey = name.split('.')[1] as keyof typeof formData.agreements;
        setFormData(prev => ({
          ...prev,
          agreements: {
            ...prev.agreements,
            [agreementKey]: checkbox.checked
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // 이메일 중복 확인 초기화
    if (name === 'email') {
      setEmailChecked(false);
    }
  };

  const checkEmailDuplicate = async () => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: '이메일을 입력해주세요.' }));
      return;
    }

    // 실제로는 API 호출
    // 임시로 특정 이메일은 중복으로 처리
    const duplicateEmails = ['test@test.com', 'admin@test.com'];
    
    if (duplicateEmails.includes(formData.email)) {
      setErrors(prev => ({ ...prev, email: '이미 사용중인 이메일입니다.' }));
      setEmailChecked(false);
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
      setEmailChecked(true);
      alert('사용 가능한 이메일입니다.');
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 2글자 이상 입력해주세요.';
    }

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    } else if (!emailChecked) {
      newErrors.email = '이메일 중복 확인을 해주세요.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자리 이상 입력해주세요.';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문과 숫자를 포함해야 합니다.';
    }

    // 비밀번호 확인
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호를 다시 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 휴대폰 번호 검증
    if (!formData.phone) {
      newErrors.phone = '휴대폰 번호를 입력해주세요.';
    } else if (!/^01[0-9]-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)';
    }

    // 필수 약관 동의 검증
    if (!formData.agreements.terms) {
      newErrors.terms = '이용약관에 동의해주세요.';
    }
    if (!formData.agreements.privacy) {
      newErrors.privacy = '개인정보처리방침에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 실제로는 API 호출
      console.log('회원가입 데이터:', formData);
      
      // 성공 시 로그인 페이지로 이동
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      router.push('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrors({ general: '회원가입 중 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllAgree = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreements: {
        terms: checked,
        privacy: checked,
        marketing: checked
      }
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">MS농장의 신선한 농산물을 만나보세요</p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
              
              {/* 이름 */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="이름을 입력하세요"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* 이메일 */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : emailChecked ? 'border-green-500' : 'border-gray-300'
                      }`}
                      placeholder="이메일을 입력하세요"
                    />
                    {emailChecked && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={checkEmailDuplicate}
                    className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
                  >
                    중복확인
                  </button>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* 비밀번호 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="비밀번호를 입력하세요"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  <p className="text-xs text-gray-500 mt-1">8자리 이상, 영문+숫자 포함</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호 확인 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* 추가 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">추가 정보</h3>
              
              {/* 휴대폰 번호 */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  휴대폰 번호 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="010-1234-5678"
                    maxLength={13}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* 주소 */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="주소를 입력하세요"
                  />
                </div>
              </div>

              {/* 생년월일, 성별 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    생년월일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    성별
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">선택안함</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 약관 동의 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">약관 동의</h3>
              
              <div className="space-y-3">
                {/* 전체 동의 */}
                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreements.terms && formData.agreements.privacy && formData.agreements.marketing}
                    onChange={(e) => handleAllAgree(e.target.checked)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-3 font-medium text-gray-900">전체 약관에 동의합니다</span>
                </label>

                {/* 개별 약관 */}
                <div className="ml-8 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreements.terms"
                        checked={formData.agreements.terms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        이용약관 동의 <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                      보기
                    </button>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreements.privacy"
                        checked={formData.agreements.privacy}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        개인정보처리방침 동의 <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                      보기
                    </button>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreements.marketing"
                        checked={formData.agreements.marketing}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        마케팅 정보 수신 동의 (선택)
                      </span>
                    </div>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                      보기
                    </button>
                  </label>
                </div>

                {(errors.terms || errors.privacy) && (
                  <p className="text-red-500 text-sm">필수 약관에 동의해주세요.</p>
                )}
              </div>
            </div>

            {/* 에러 메시지 */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-4 px-4 rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  회원가입 중...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  회원가입 완료
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* 로그인 링크 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
                  로그인하기
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;