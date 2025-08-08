import React, { FC } from 'react';

interface InputFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  charCount?: string;
  disabled?: boolean;
  className?: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  required,
  type = 'text',
  placeholder,
  charCount,
  value,
  onChange,
  error,
  maxLength,
  disabled = false,
  className,
  ...rest

}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 mb-2'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-300 focus:ring-red-200 bg-red-50'
            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        {...rest}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      {charCount && <p className='mt-1 text-xs text-gray-500'>{charCount}</p>}
    </div>
  );
};

export default InputField;
