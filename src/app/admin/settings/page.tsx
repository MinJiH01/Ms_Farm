'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Bell, 
  Shield, 
  Globe, 
  Truck, 
  CreditCard, 
  Mail, 
  Smartphone,
  Users,
  Settings as SettingsIcon,
  AlertCircle,
  CheckCircle,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsState {
  site: {
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
  };
  notifications: {
    newOrder: boolean;
    lowStock: boolean;
    customerMessage: boolean;
    dailyReport: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  shipping: {
    freeShippingThreshold: number;
    shippingCost: number;
    deliveryDays: number;
    shippingMessage: string;
  };
  payment: {
    cardEnabled: boolean;
    bankTransferEnabled: boolean;
    phonePayEnabled: boolean;
    cashEnabled: boolean;
  };
  security: {
    sessionTimeout: number;
    twoFactorAuth: boolean;
    loginAttempts: number;
    passwordExpiry: number;
  };
}

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('site');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState<SettingsState>({
    site: {
      name: 'MS농장',
      description: '신선하고 건강한 농산물을 제공하는 온라인 쇼핑몰',
      email: 'info@msfarm.co.kr',
      phone: '02-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      logo: '/images/logo.png'
    },
    notifications: {
      newOrder: true,
      lowStock: true,
      customerMessage: true,
      dailyReport: false,
      emailNotifications: true,
      smsNotifications: false
    },
    shipping: {
      freeShippingThreshold: 30000,
      shippingCost: 3000,
      deliveryDays: 2,
      shippingMessage: '주문 후 1-2일 내 배송됩니다.'
    },
    payment: {
      cardEnabled: true,
      bankTransferEnabled: true,
      phonePayEnabled: false,
      cashEnabled: false
    },
    security: {
      sessionTimeout: 60,
      twoFactorAuth: false,
      loginAttempts: 5,
      passwordExpiry: 90
    }
  });

  const tabs = [
    { id: 'site', name: '사이트 설정', icon: Globe },
    { id: 'notifications', name: '알림 설정', icon: Bell },
    { id: 'shipping', name: '배송 설정', icon: Truck },
    { id: 'payment', name: '결제 설정', icon: CreditCard },
    { id: 'security', name: '보안 설정', icon: Shield }
  ];

  const handleInputChange = (section: keyof SettingsState, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('설정 저장:', settings);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('설정 저장 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSiteSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사이트 이름</label>
            <input
              type="text"
              value={settings.site.name}
              onChange={(e) => handleInputChange('site', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">연락처 이메일</label>
            <input
              type="email"
              value={settings.site.email}
              onChange={(e) => handleInputChange('site', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">연락처 전화번호</label>
            <input
              type="tel"
              value={settings.site.phone}
              onChange={(e) => handleInputChange('site', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
            <input
              type="text"
              value={settings.site.address}
              onChange={(e) => handleInputChange('site', 'address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">사이트 설명</label>
          <textarea
            value={settings.site.description}
            onChange={(e) => handleInputChange('site', 'description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">로고 업로드</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-500">로고</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              파일 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>
        <div className="space-y-4">
          {[
            { key: 'newOrder', label: '신규 주문 알림', desc: '새로운 주문이 들어올 때 알림을 받습니다.' },
            { key: 'lowStock', label: '재고 부족 알림', desc: '상품 재고가 부족할 때 알림을 받습니다.' },
            { key: 'customerMessage', label: '고객 문의 알림', desc: '고객 문의가 들어올 때 알림을 받습니다.' },
            { key: 'dailyReport', label: '일일 리포트', desc: '매일 매출 및 주문 현황을 받습니다.' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                  onChange={(e) => handleInputChange('notifications', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">알림 방식</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">이메일 알림</p>
                  <p className="text-sm text-gray-600">이메일로 알림을 받습니다.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">SMS 알림</p>
                  <p className="text-sm text-gray-600">문자 메시지로 알림을 받습니다.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">배송 설정</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">무료배송 기준금액</label>
            <div className="relative">
              <input
                type="number"
                value={settings.shipping.freeShippingThreshold}
                onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', Number(e.target.value))}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기본 배송료</label>
            <div className="relative">
              <input
                type="number"
                value={settings.shipping.shippingCost}
                onChange={(e) => handleInputChange('shipping', 'shippingCost', Number(e.target.value))}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">배송 소요일</label>
            <div className="relative">
              <input
                type="number"
                value={settings.shipping.deliveryDays}
                onChange={(e) => handleInputChange('shipping', 'deliveryDays', Number(e.target.value))}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">일</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">배송 안내 메시지</label>
          <textarea
            value={settings.shipping.shippingMessage}
            onChange={(e) => handleInputChange('shipping', 'shippingMessage', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            placeholder="고객에게 표시될 배송 관련 안내 메시지를 입력하세요."
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 방식</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'cardEnabled', label: '카드 결제', desc: '신용카드, 체크카드 결제' },
            { key: 'bankTransferEnabled', label: '무통장 입금', desc: '계좌 이체 결제' },
            { key: 'phonePayEnabled', label: '휴대폰 결제', desc: '휴대폰 소액결제' },
            { key: 'cashEnabled', label: '현금 결제', desc: '현장 현금 결제' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.payment[item.key as keyof typeof settings.payment] as boolean}
                  onChange={(e) => handleInputChange('payment', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">보안 설정</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">세션 타임아웃 (분)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="15"
              max="480"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">로그인 시도 제한 횟수</label>
            <input
              type="number"
              value={settings.security.loginAttempts}
              onChange={(e) => handleInputChange('security', 'loginAttempts', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="3"
              max="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 만료 기간 (일)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleInputChange('security', 'passwordExpiry', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="30"
              max="365"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">2단계 인증 (2FA)</p>
                <p className="text-sm text-gray-600">추가 보안을 위한 2단계 인증을 활성화합니다.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">비밀번호 변경</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="현재 비밀번호 입력"
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="새 비밀번호 입력"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="새 비밀번호 다시 입력"
              />
            </div>

            <div className="lg:col-span-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'site':
        return renderSiteSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'shipping':
        return renderShippingSettings();
      case 'payment':
        return renderPaymentSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderSiteSettings();
    }
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">설정</h1>
            <p className="text-gray-600 mt-1">시스템 설정을 관리하고 구성할 수 있습니다.</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  설정 저장
                </>
              )}
            </button>
          </div>
        </div>

        {/* 성공 메시지 */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-green-700">설정이 성공적으로 저장되었습니다.</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 탭 네비게이션 */}
        <div className="lg:w-64">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;