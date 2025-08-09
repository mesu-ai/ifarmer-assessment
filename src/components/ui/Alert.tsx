'use client';

import React, { FC, useEffect } from 'react';
import CheckCircleIcon from '@/assets/svgs/CheckCircleIcon';
import XCircleIcon from '@/assets/svgs/XCircleIcon';
import ExclamationTriangleIcon from '@/assets/svgs/ExclamationTriangleIcon';
import InformationCircleIcon from '@/assets/svgs/InformationCircleIcon';
import { AlertProps } from '@/types/types';

const Alert: FC<AlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  const getIcon = () => {
    const iconProps = { className: "h-5 w-5", width: 20, height: 20 };
    
    switch (type) {
      case 'success':
        return <CheckCircleIcon {...iconProps} />;
      case 'error':
        return <XCircleIcon {...iconProps} />;
      case 'warning':
        return <ExclamationTriangleIcon {...iconProps} />;
      default:
        return <InformationCircleIcon {...iconProps} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${getIconColor()}`}>
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            {title && (
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {title}
              </h3>
            )}
            <div className="text-sm text-gray-700">
              {message}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
