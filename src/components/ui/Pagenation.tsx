'use client';

import ArrowIcon from '@/assets/svgs/ArrowIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, MouseEvent, ReactNode, useState } from 'react';

interface PaginationProps {
  currentPage?: number;
  setCurrentPage?: (value: number | ((prev: number) => number)) => void;
  totalPage?: number;
  maxPagesToShow?: number;
  hadleCurrentPage?: (value: number) => void;
}

interface ButtonProps {
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  action: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className = '',
  isActive = false,
  disabled,
  action,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={action}
      type="button"
      className={`h-7 sm:h-8 w-8  md:h-11 md:w-11 text-sm sm:text-base md:text-lg font-medium rounded-md flex justify-center items-center hover:bg-[#1181b2]/10 disabled:bg-slate-300 disabled:text-white  hover:text-cyan-500 hover:cursor-pointer ${isActive ? 'bg-blue-500 text-white' : 'bg-white'} ${className}`}
    >
      {children}
    </button>
  );
};

const Ellipsis = () => {
  return (
    <span className="h-8 w-8 md:h-11 md:w-11 text-lg font-medium flex justify-center items-center">
      ...
    </span>
  );
};

const Pagination: FC<PaginationProps> = ({
  currentPage: currPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(currPage);
  const totalPage = 10;
  const maxPagesToShow = 3;

  const router = useRouter();
  const searchParams = useSearchParams()

  const hadleCurrentPage = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set('page', String(page));
    router.push(`?${urlSearchParams.toString()}`);
  };

  const renderButton = (key: number, value: number) => (
    <Button
      key={key}
      action={() => {
        setCurrentPage(value);
        if (typeof hadleCurrentPage === 'function') {
          hadleCurrentPage(value);
        }
      }}
      isActive={currentPage === value}
      // disabled={currentPage === value}
      className="mx-1.5 sm:mx-2"
    >
      {value}
    </Button>
  );

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPage <= maxPagesToShow) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(renderButton(i, i));
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pages.push(renderButton(1, 1));
        if (startPage > 2) {
          pages.push(<Ellipsis key="ellipsis-start" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderButton(i, i));
      }

      if (endPage < totalPage) {
        if (endPage < totalPage - 1) {
          pages.push(<Ellipsis key="ellipsis-end" />);
        }
        pages.push(renderButton(totalPage, totalPage));
      }
    }

    return pages;
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Button
        disabled={currentPage === 1}
        action={() => {
          setCurrentPage((prev) => prev - 1);
          if (typeof hadleCurrentPage === 'function') {
            hadleCurrentPage(currentPage - 1);
          }
        }}
        className="mr-3 sm:mr-8"
      >
        <ArrowIcon />
      </Button>

      {renderPageNumbers()}

      <Button
        disabled={currentPage === totalPage}
        action={() => {
          setCurrentPage((prev) => prev + 1);
          if (typeof hadleCurrentPage === 'function') {
            hadleCurrentPage(currentPage + 1);
          }
        }}
        className="ml-3 sm:ml-8"
      >
        <ArrowIcon className="rotate-180" />
      </Button>
    </div>
  );
};

export default Pagination;
