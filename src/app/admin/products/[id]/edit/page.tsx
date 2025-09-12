'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Eye, Trash2, AlertCircle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface ProductFormData {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  weight: string;
  origin: string;
  status: 'active' | 'inactive';
  images: string[];
  tags: string[];
  createdAt: string;
  sales: number;
}

const AdminEditProductPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const categories = [
    '채소', '과일', '곡물', '견과류', '허브', '기타'
  ];

  const origins = [
    '국산', '경상북도', '전라남도', '충청북도', '강원도', '제주도'
  ];

  // 상품 데이터 로드 (실제로는 API에서 가져옴)
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // 임시 데이터 (실제로는 API 호출)
        const productData: ProductFormData = {
          id: parseInt(productId),
          name: '신선한 토마토',
          description: '농장에서 직접 재배한 신선하고 달콤한 토마토입니다. 비타민 C가 풍부하며, 샐러드나 요리용으로 좋습니다.',
          price: 3500,
          originalPrice: 4000,
          category: '채소',
          stock: 150,
          weight: '1kg',
          origin: '경상북도',
          status: 'active',
          images: ['/images/tomato1.jpg', '/images/tomato2.jpg'],
          tags: ['신선', '국산', '유기농', '토마토'],
          createdAt: '2024-01-15',
          sales: 245
        };
        
        setFormData(productData);
      } catch (error) {
        console.error('상품 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'stock' 
        ? Number(value) 
        : value
    } : null);
    
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    
    const files = Array.from(e.target.files || []);
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => prev ? {
      ...prev,
      images: [...prev.images, ...newImageUrls].slice(0, 5) // 최대 5개
    } : null);
  };

  const removeImage = (index: number) => {
    if (!formData) return;
    
    setFormData(prev => prev ? {
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    } : null);
  };

  const addTag = () => {
    if (!formData || !currentTag.trim() || formData.tags.includes(currentTag.trim())) return;
    
    setFormData(prev => prev ? {
      ...prev,
      tags: [...prev.tags, currentTag.trim()]
    } : null);
    setCurrentTag('');
  };

  const removeTag = (tag: string) => {
    if (!formData) return;
    
    setFormData(prev => prev ? {
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    } : null);
  };

  const validateForm = () => {
    if (!formData) return false;
    
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = '상품명을 입력해주세요.';
    if (!formData.description.trim()) newErrors.description = '상품 설명을 입력해주세요.';
    if (formData.price <= 0) newErrors.price = '올바른 가격을 입력해주세요.';
    if (!formData.category) newErrors.category = '카테고리를 선택해주세요.';
    if (formData.stock < 0) newErrors.stock = '올바른 재고량을 입력해주세요.';
    if (!formData.origin) newErrors.origin = '원산지를 선택해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData || !validateForm()) return;

    setIsLoading(true);

    try {
      // 실제로는 API 호출
      console.log('상품 수정:', formData);
      
      // 성공 시 상품 목록으로 이동
      router.push('/admin/products');
    } catch (error) {
      console.error('상품 수정 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formData) return;
    
    setIsDeleteLoading(true);
    
    try {
      // 실제로는 API 호출
      console.log('상품 삭제:', formData.id);
      
      // 성공 시 상품 목록으로 이동
      router.push('/admin/products');
    } catch (error) {
      console.error('상품 삭제 실패:', error);
    } finally {
      setIsDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handlePreview = () => {
    // 미리보기 모달 또는 새 창 열기
    console.log('상품 미리보기:', formData);
  };

  if (isLoading || !formData) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/admin/products"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            상품 목록으로 돌아가기
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">상품 수정</h1>
            <p className="text-gray-600 mt-1">상품 정보를 수정할 수 있습니다.</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>상품 ID: {formData.id}</span>
              <span>등록일: {formData.createdAt}</span>
              <span>판매량: {formData.sales}개</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
              미리보기
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              삭제
            </button>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 기본 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 기본 정보 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상품명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="상품명을 입력하세요"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상품 설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="상품에 대한 상세한 설명을 입력하세요"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      판매가격 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className={`w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
                    </div>
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      정가 (할인 전 가격)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice || ''}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">카테고리 선택</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      재고량 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock || ''}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className={`w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.stock ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">개</span>
                    </div>
                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      중량/용량
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="예: 1kg, 500g, 1박스"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      원산지 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.origin ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">원산지 선택</option>
                      {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </select>
                    {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 이미지 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">상품 이미지</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">클릭하여 업로드</span> 또는 드래그앤드롭
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG 또는 JPEG (최대 5개)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">이미지 {index + 1}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {index === 0 && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                            대표
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 태그 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">상품 태그</h3>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="태그를 입력하고 엔터를 누르세요"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    추가
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-green-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽: 상태 및 액션 */}
          <div className="space-y-6">
            {/* 상품 통계 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">상품 통계</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">총 판매량</span>
                  <span className="font-semibold text-gray-900">{formData.sales}개</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">현재 재고</span>
                  <span className={`font-semibold ${formData.stock < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                    {formData.stock}개
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">총 매출</span>
                  <span className="font-semibold text-green-600">
                    {(formData.sales * formData.price).toLocaleString()}원
                  </span>
                </div>

                {formData.originalPrice > formData.price && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">할인율</span>
                    <span className="font-semibold text-orange-600">
                      {Math.round((1 - formData.price / formData.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 상품 상태 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">상품 상태</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={handleInputChange}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">활성 (판매중)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={handleInputChange}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">비활성 (판매중단)</span>
                </label>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">액션</h3>
              
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      수정 중...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      변경사항 저장
                    </>
                  )}
                </button>

                <Link
                  href="/admin/products"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  취소
                </Link>
              </div>
            </div>

            {/* 경고 메시지 */}
            {formData.stock < 10 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">재고 부족 경고</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      현재 재고가 {formData.stock}개 남았습니다. 재고를 보충해주세요.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">상품 삭제</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleteLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    삭제 중...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    삭제
                  </>
                )}
              </button>
              
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEditProductPage;