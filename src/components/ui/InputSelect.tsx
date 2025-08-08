import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface InputSelectProps {
  name: string;
  label: string;
  value: string | number;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  error,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-300 focus:ring-red-200 bg-red-50'
            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputSelect;
