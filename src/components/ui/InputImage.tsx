import React from 'react';

interface InputImageProps {
  label: string;
  images: string[];
  onImageChange: (index: number, value: string) => void;
  onImageRemove: (index: number) => void;
  onImageAdd: (url: string) => void;
  imageInput: string;
  onImageInputChange: (value: string) => void;
  error?: string;
  maxImages?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const InputImage: React.FC<InputImageProps> = ({
  label,
  images,
  onImageChange,
  onImageRemove,
  onImageAdd,
  imageInput,
  onImageInputChange,
  error,
  maxImages = 5,
  disabled = false,
  required = false,
  className = "",
}) => {
  const validImages = images.filter(img => img.trim() !== '');

  const handleAddImage = () => {
    if (imageInput.trim() && validImages.length < maxImages) {
      onImageAdd(imageInput.trim());
    }
  };

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {label} {required && <span className="text-red-500">*</span>}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Add up to {maxImages} images for your product. At least one image is required.
      </p>

      <div className="space-y-3">
        {/* Existing Images */}
        {validImages.map((image, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
          >
            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <input
              type="url"
              value={image}
              onChange={(e) => onImageChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter image URL"
              disabled={disabled}
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="flex-shrink-0 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              disabled={disabled}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Add New Image */}
        {validImages.length < maxImages && (
          <div className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-lg">
              +
            </span>
            <input
              type="url"
              value={imageInput}
              onChange={(e) => onImageInputChange(e.target.value)}
              className="flex-1 px-3 py-2 border-0 bg-transparent focus:outline-none"
              placeholder="Enter image URL to add"
              disabled={disabled}
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled || !imageInput.trim()}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Image requirements:</strong> Use direct image URLs ending with .jpg, .jpeg, .png, .gif, or .webp
        </p>
      </div>
    </div>
  );
};

export default InputImage;
