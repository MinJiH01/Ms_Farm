'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Save,
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Trash2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  detailAddress: string;
  zipCode: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'delete'>('profile');
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    detailAddress: '',
    zipCode: ''
  });
  
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userData);
      // 실제로는 API에서 전체 프로필 정보를 가져옴
      setProfileData({
        name: user.name || '김철수',
        email: user.email || 'user@test.com',
        phone: '010-1234-5678',
        birthDate: '1990-01-01',
        gender: 'male',
        address: '서울시 강남구 테헤란로 123',
        detailAddress: '아파트 101동 1001호',
        zipCode: '06234'
      });
      setLoading(false);
    } catch (error) {
      console.error('프로필 정보 로드 실패:', error);
      router.push('/login');
    }
  }, [router]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateProfile = () => {
    if (!profileData.name.trim()) {
      setMessage({ type: 'error', text: '이름을 입력해주세요.' });
      return false;
    }
    if (!profileData.email.trim()) {
      setMessage({ type: 'error', text: '이메일을 입력해주세요.' });
      return false;
    }
    if (!profileData.phone.trim()) {
      setMessage({ type: 'error', text: '연락처를 입력해주세요.' });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!passwordData.currentPassword) {
      setMessage({ type: 'error', text: '현재 비밀번호를 입력해주세요.' });
      return false;
    }
    if (!passwordData.newPassword) {
      setMessage({ type: 'error', text: '새 비밀번호를 입력해주세요.' });
      return false;
    }
    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: '새 비밀번호는 8자 이상이어야 합니다.' });
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: '새 비밀번호 확인이 일치하지 않습니다.' });
      return false;
    }
    return true;
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfile()) return;
    
    setSaving(true);
    setMessage(null);

    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // localStorage 업데이트
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUser = {
        ...currentUser,
        name: profileData.name,
        email: profileData.email
      };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      // 헤더 업데이트를 위한 이벤트 발생
      window.dispatchEvent(new Event('authStateChanged'));
      
      setMessage({ type: 'success', text: '프로필이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
      setMessage({ type: 'error', text: '프로필 업데이트 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setSaving(true);
    setMessage(null);

    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: 'success', text: '비밀번호가 성공적으로 변경되었습니다.' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: '비밀번호 변경 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAccountDelete = async () => {
    if (!confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    setSaving(true);
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 로그아웃 처리
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      window.dispatchEvent(new Event('authStateChanged'));
      
      alert('계정이 삭제되었습니다.');
      router.push('/');
    } catch (error) {
      setMessage({ type: 'error', text: '계정 삭제 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">프로필 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/mypage"
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">계정 설정</h1>
            <p className="text-gray-600">개인정보 및 보안 설정을 관리하세요</p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-5 w-5 inline mr-2" />
              개인정보
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'password'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Lock className="h-5 w-5 inline mr-2" />
              비밀번호 변경
            </button>
            <button
              onClick={() => setActiveTab('delete')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'delete'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Trash2 className="h-5 w-5 inline mr-2" />
              계정 삭제
            </button>
          </div>
        </div>

        {/* 메시지 표시 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {message.text}
          </div>
        )}

        {/* 탭 컨텐츠 */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">개인정보 수정</h2>
              
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    생년월일
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={profileData.birthDate}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    성별
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    우편번호
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={profileData.zipCode}
                      onChange={handleProfileChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
                    >
                      주소검색
                    </button>
                  </div>
                </div>
              </div>

              {/* 주소 정보 */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
                />
                
                <input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  value={profileData.detailAddress}
                  onChange={handleProfileChange}
                  placeholder="상세 주소"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      저장 중...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      저장하기
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSave} className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">비밀번호 변경</h2>
              
              <div className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      현재 비밀번호 *
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      새 비밀번호 *
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      8자 이상, 영문/숫자/특수문자 조합을 권장합니다.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      새 비밀번호 확인 *
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        변경 중...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        비밀번호 변경
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'delete' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">계정 삭제</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-2">계정 삭제 시 주의사항</h3>
                    <ul className="text-red-800 space-y-1 text-sm">
                      <li>• 계정 삭제 후 복구가 불가능합니다</li>
                      <li>• 모든 주문 내역이 삭제됩니다</li>
                      <li>• 적립된 포인트가 소멸됩니다</li>
                      <li>• 찜한 상품 목록이 삭제됩니다</li>
                      <li>• 작성한 리뷰가 모두 삭제됩니다</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  계정을 삭제하면 모든 개인정보와 이용 기록이 완전히 삭제되며, 
                  이는 되돌릴 수 없습니다. 정말로 계정을 삭제하시겠습니까?
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={handleAccountDelete}
                    disabled={saving}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        삭제 중...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-5 w-5" />
                        계정 삭제
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;