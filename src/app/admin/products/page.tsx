'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Download,
  Upload,
  Package
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  image: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: string;
  sales: number;
}

const AdminProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: '신선한 토마토',
      price: 3500,
      originalPrice: 4000,
      stock: 150,
      category: '채소',
      image: '/images/tomato.jpg',
      status: 'active',
      createdAt: '2024-01-15',
      sales: 245
    },
    {
      id: 2,
      name: '유기농 상추',
      price: 2800,
      stock: 80,
      category: '채소',
      image: '/images/lettuce.jpg',
      status: 'active',
      createdAt: '2024-01-20',
      sales: 123
    },
    {
      id: 3,
      name: '방울토마토',
      price: 4200,
      stock: 0,
      category: '채소',
      image: '/images/cherry-tomato.jpg',
      status: 'out_of_stock',
      createdAt: '2024-02-01',
      sales: 89
    },
    {
      id: 4,
      name: '친환경 당근',
      price: 2500,
      stock: 200,
      category: '채소',
      image: '/images/carrot.jpg',
      status: 'active',
      createdAt: '2024-02-05',
      sales: 167
    },
    {
      id: 5,
      name: '국산 사과',
      price: 8000,
      originalPrice: 9000,
      stock: 45,
      category: '과일',
      image: '/images/apple.jpg',
      status: 'active',
      createdAt: '2024-02-10',
      sales: 78
    }
  ]);

  const categories = ['all', '채소', '과일', '곡물', '기타'];
  const statuses = ['all', 'active', 'inactive', 'out_of_stock'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length 
        ? [] 
        : filteredProducts.map(p => p.id)
    );
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      // 실제로는 API 호출
      console.log('Delete product:', id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">활성</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">비활성</span>;
      case 'out_of_stock':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">품절</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
            <p className="text-gray-600 mt-1">등록된 상품을 관리하고 편집할 수 있습니다.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              내보내기
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              가져오기
            </button>
            <Link 
              href="/admin/products/add"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Plus className="h-4 w-4" />
              새 상품 추가
            </Link>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">모든 카테고리</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="out_of_stock">품절</option>
            </select>
          </div>
        </div>
      </div>

      {/* 상품 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* 테이블 헤더 */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  전체 선택 ({selectedProducts.length}/{filteredProducts.length})
                </span>
              </label>
            </div>
            
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  선택 삭제
                </button>
                <button className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">
                  상태 변경
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 테이블 내용 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상품 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가격
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  재고
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  판매량
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  등록일
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 bg-gray-200 rounded-lg mr-4 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                        <div className="text-xs text-gray-400">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatPrice(product.price)}원
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}원
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock < 50 ? 'text-yellow-600' : 'text-gray-900'
                    }`}>
                      {product.stock}개
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{product.sales}개</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.createdAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1" title="보기">
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="text-green-600 hover:text-green-800 p-1" 
                        title="수정"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1" 
                        title="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1" title="더보기">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">상품이 없습니다</h3>
            <p className="mt-1 text-sm text-gray-500">새 상품을 추가해보세요.</p>
            <div className="mt-6">
              <Link 
                href="/admin/products/add"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Plus className="h-4 w-4" />
                새 상품 추가
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {filteredProducts.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredProducts.length}</span>개의 상품
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              이전
            </button>
            <span className="px-3 py-2 text-sm bg-green-500 text-white rounded-lg">1</span>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;