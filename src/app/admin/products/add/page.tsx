'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  origin: string;
  stock: number;
  images: string[];
  tags: string[];
  weight: string;
  harvestDate: string;
  expiryDate: string;
  organicCertified: boolean;
  farmLocation: string;
  nutritionalInfo: string;
}

const AdminAddProductPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    origin: '',
    stock: 0,
    images: [],
    tags: [],
    weight: '',
    harvestDate: '',
    expiryDate: '',
    organicCertified: false,
    farmLocation: '',
    nutritionalInfo: ''
  });

  const categories = [
    '과일',
    '채소',
    '곡물',
    '허브',
    '견과류',
    '기타'
  ];

  const origins = [
    '국내산',
    '수입산',
    '유기농',
    '친환경'
  ];

  // 입력값 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // 이미지 변경 핸들러
  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  // 태그 추가 핸들러
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // 태그 삭제 핸들러
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // 태그 입력에서 엔터 키 처리
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.name || !formData.price || !formData.category) {
      alert('상품명, 가격, 카테고리는 필수 입력 항목입니다.');
      return;
    }

    if (formData.images.length === 0) {
      alert('최소 1개의 상품 이미지를 업로드해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 실제 프로젝트에서는 API 호출
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('상품이 성공적으로 등록되었습니다.');
        router.push('/admin/products');
      } else {
        throw new Error('상품 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('상품 등록 오류:', error);
      alert('상품 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                뒤로가기
              </button>
              <h1 className="text-3xl font-bold text-gray-900">새 상품 등록</h1>
            </div>
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">기본 정보</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 상품명 */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  상품명 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="상품명을 입력하세요"
                />
              </div>

              {/* 가격 */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  가격 (원) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              {/* 재고 */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  재고 수량
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">카테고리를 선택하세요</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* 원산지 */}
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                  원산지
                </label>
                <select
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">원산지를 선택하세요</option>
                  {origins.map(origin => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
                </select>
              </div>

              {/* 중량 */}
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  중량/용량
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="예: 1kg, 500g, 1박스"
                />
              </div>

              {/* 농장 위치 */}
              <div>
                <label htmlFor="farmLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  농장 위치
                </label>
                <input
                  type="text"
                  id="farmLocation"
                  name="farmLocation"
                  value={formData.farmLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="예: 경상남도 창원시"
                />
              </div>

              {/* 수확일 */}
              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-2">
                  수확일
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* 유통기한 */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  유통기한
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* 유기농 인증 */}
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="organicCertified"
                    name="organicCertified"
                    checked={formData.organicCertified}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="organicCertified" className="ml-2 block text-sm text-gray-900">
                    유기농 인증 상품
                  </label>
                </div>
              </div>

              {/* 상품 설명 */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  상품 설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="상품에 대한 자세한 설명을 입력하세요"
                />
              </div>

              {/* 영양 정보 */}
              <div className="md:col-span-2">
                <label htmlFor="nutritionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  영양 정보
                </label>
                <textarea
                  id="nutritionalInfo"
                  name="nutritionalInfo"
                  value={formData.nutritionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="칼로리, 영양성분 등을 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">상품 이미지</h2>
            <ImageUpload
              value={formData.images}
              onChange={handleImagesChange}
              maxImages={5}
              maxSize={5}
            />
          </div>

          {/* 태그 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">태그</h2>
            
            <div className="space-y-4">
              {/* 태그 입력 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="태그를 입력하고 엔터를 누르세요"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  추가
                </button>
              </div>

              {/* 태그 목록 */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                '등록 중...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  상품 등록
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProductPage;