import Button from '@/components/ui/Button';
import React from 'react';

interface ErrorDisplayProps {
  error: string;
  onBack?: () => void;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onBack,
  onRetry,
}) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-red-50 border border-red-200 rounded-md p-6 max-w-md'>
        <h2 className='text-red-800 font-semibold mb-2'>Error</h2>
        <p className='text-red-600 mb-4'>{error}</p>
        <div className='space-x-2'>
          <Button
            onClick={onBack}
            className='bg-gray-600 text-white  hover:bg-gray-700'
          >
            Back
          </Button>
          <Button
            onClick={onRetry}
            className='bg-red-600 text-white rounded-md hover:bg-red-700'
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
