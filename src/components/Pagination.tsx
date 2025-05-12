import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${currentPage === page
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {page}
        </button>
      ));
    }

    const visiblePages = [];
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
      visiblePages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      visiblePages.push(1);
      visiblePages.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1);
      visiblePages.push('...');
      visiblePages.push(currentPage - 1);
      visiblePages.push(currentPage);
      visiblePages.push(currentPage + 1);
      visiblePages.push('...');
      visiblePages.push(totalPages);
    }

    return visiblePages.map((page, index) => {
      if (page === '...') {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-4 py-2 text-gray-400"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${currentPage === page
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;