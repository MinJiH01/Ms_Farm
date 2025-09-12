'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  Plus,
  List
} from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // 로그인 페이지는 사이드바 없이 렌더링
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    {
      name: '대시보드',
      href: '/admin/dashboard',
      icon: Home,
      current: pathname === '/admin/dashboard'
    },
    {
      name: '상품 관리',
      icon: Package,
      current: pathname.startsWith('/admin/products'),
      submenu: [
        { name: '상품 목록', href: '/admin/products', icon: List },
        { name: '상품 추가', href: '/admin/products/add', icon: Plus }
      ]
    },
    {
      name: '주문 관리',
      href: '/admin/orders',
      icon: ShoppingCart,
      current: pathname.startsWith('/admin/orders')
    },
    {
      name: '고객 관리',
      href: '/admin/customers',
      icon: Users,
      current: pathname.startsWith('/admin/customers')
    },
    {
      name: '통계',
      href: '/admin/analytics',
      icon: BarChart3,
      current: pathname.startsWith('/admin/analytics')
    },
    {
      name: '설정',
      href: '/admin/settings',
      icon: Settings,
      current: pathname.startsWith('/admin/settings')
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 사이드바 오버레이 (모바일) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* 사이드바 */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* 로고 */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">MS농장</span>
          </div>
          <button
            className="lg:hidden p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div className="space-y-1">
                    <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                      item.current 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    <div className="ml-8 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === subItem.href
                              ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <subItem.icon className="mr-3 h-4 w-4" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* 로그아웃 */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              로그아웃
            </button>
          </div>
        </nav>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* 상단 바 */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">MS농장</span>
            </div>
            <div className="w-10"></div>
          </div>
        </header>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;