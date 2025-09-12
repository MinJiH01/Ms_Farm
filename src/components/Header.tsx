'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  LogOut,
  Settings,
  Package
} from 'lucide-react';

interface UserData {
  email: string;
  name: string;
  loginTime: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: '홈', href: '/' },
    { name: '상품', href: '/products' },
    { name: '카테고리', href: '/categories' },
    { name: '농장소식', href: '/news' },
    { name: '문의', href: '/contact' },
  ];

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('userToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUserData: UserData = JSON.parse(userData);
          setUser(parsedUserData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
    
    // 로그인/로그아웃 시 상태 업데이트를 위한 이벤트 리스너
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 커스텀 이벤트 리스너 (같은 탭에서의 로그인/로그아웃 감지)
    window.addEventListener('authStateChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleStorageChange);
    };
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC 키 감지
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUserMenu(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      setUser(null);
      setShowUserMenu(false);
      
      // 커스텀 이벤트 발생
      window.dispatchEvent(new Event('authStateChanged'));
      
      router.push('/');
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  // 사용자 이름 축약 (길면 줄임)
  const getDisplayName = (name: string) => {
    return name.length > 8 ? `${name.slice(0, 8)}...` : name;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <span className="font-bold text-xl text-gray-900">MS농장</span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-green-600 bg-green-50' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 우측 아이콘들 */}
          <div className="flex items-center space-x-4">
            {/* 검색 버튼 */}
            <button 
              onClick={handleSearchClick}
              className="text-gray-600 hover:text-green-600 transition-colors"
              aria-label="검색"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* 장바구니 */}
            <Link 
              href="/cart" 
              className="text-gray-600 hover:text-green-600 transition-colors relative"
              aria-label="장바구니"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* 사용자 메뉴 */}
            <div className="relative" ref={userMenuRef}>
              {!isLoading && user ? (
                // 로그인된 상태
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                    aria-label="사용자 메뉴"
                    aria-expanded={showUserMenu}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      {getDisplayName(user.name)}님
                    </span>
                  </button>

                  {/* 사용자 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        {/* 사용자 정보 */}
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>

                        {/* 메뉴 아이템들 */}
                        <Link
                          href="/mypage"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeMenus}
                        >
                          <User className="h-4 w-4 mr-2" />
                          마이페이지
                        </Link>
                        
                        <Link
                          href="/mypage/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeMenus}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          주문내역
                        </Link>

                        <Link
                          href="/mypage/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={closeMenus}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          계정설정
                        </Link>

                        <div className="border-t border-gray-100 mt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            로그아웃
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // 로그인되지 않은 상태
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>

            {/* 모바일 메뉴 토글 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              aria-label="메뉴 열기/닫기"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors ${
                    pathname === item.href ? 'text-green-600 bg-green-50' : ''
                  }`}
                  onClick={closeMenus}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {user.name}님, 안녕하세요!
                    </div>
                    <Link
                      href="/mypage"
                      className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMenus}
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMenus}
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMenus}
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;