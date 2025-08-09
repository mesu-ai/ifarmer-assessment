import { InputTextareaProps } from '@/types/types';
import React from 'react';

const InputTextarea: React.FC<InputTextareaProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  required = false,
  className = "",
  rows = 4,
  maxLength,
  charCount,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
          error
            ? 'border-red-300 focus:ring-red-200 bg-red-50'
            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {charCount && <p className="mt-1 text-xs text-gray-500">{charCount}</p>}
    </div>
  );
};

export default InputTextarea;
