'use client';

import React, { FC } from 'react';
import ExclamationCircleIcon from '@/assets/svgs/ExclamationCircleIcon';
import InformationCircleStrokeIcon from '@/assets/svgs/InformationCircleStrokeIcon';
import { ConfirmDialogProps } from '@/types/types';

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
}) => {
  if (!isOpen) return null;

  const getConfirmButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getIcon = () => {
    const iconProps = { className: "h-6 w-6", width: 24, height: 24 };
    
    switch (type) {
      case 'danger':
        return <ExclamationCircleIcon {...iconProps} className="h-6 w-6 text-red-600" />;
      case 'warning':
        return <ExclamationCircleIcon {...iconProps} className="h-6 w-6 text-yellow-600" />;
      default:
        return <InformationCircleStrokeIcon {...iconProps} className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {title}
            </h3>
            <div className="text-sm text-gray-700">
              {message}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type='button'
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {cancelText}
          </button>
          <button
            type='button'
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${getConfirmButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
