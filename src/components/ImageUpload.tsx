'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  maxSize?: number; // MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value = [],
  onChange,
  maxImages = 5,
  maxSize = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일을 Base64로 변환하는 함수
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // 파일 처리 함수
  const handleFiles = async (files: FileList) => {
    if (value.length >= maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const validFiles = Array.from(files).filter(file => {
      // 파일 크기 체크
      if (file.size > maxSize * 1024 * 1024) {
        alert(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
        return false;
      }

      // 이미지 파일 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const base64Images = await Promise.all(
        validFiles.map(file => convertToBase64(file))
      );

      const newImages = [...value, ...base64Images].slice(0, maxImages);
      onChange(newImages);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  // 드래그 앤 드롭 이벤트
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  // 파일 선택 이벤트
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  // 파일 선택 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* 업로드 영역 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
          }
          ${value.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <Upload className="h-8 w-8 text-gray-600" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isUploading ? '업로드 중...' : '이미지를 드래그하거나 클릭하여 업로드'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, JPEG 파일 ({maxSize}MB 이하, 최대 {maxImages}개)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              현재 {value.length}/{maxImages}개 업로드됨
            </p>
          </div>
        </div>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={value.length >= maxImages || isUploading}
        />
      </div>

      {/* 업로드된 이미지 미리보기 */}
      {value.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            업로드된 이미지 ({value.length}개)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`업로드된 이미지 ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                
                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* 메인 이미지 표시 */}
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    메인
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            * 첫 번째 이미지가 메인 이미지로 사용됩니다. 드래그하여 순서를 변경할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;