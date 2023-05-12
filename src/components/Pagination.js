import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Set the maximum number of pages to display at once
  const maxPages = 5;

  // Calculate the starting and ending page numbers
  let startPage, endPage;
  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= Math.ceil(maxPages / 2)) {
    startPage = 1;
    endPage = maxPages;
  } else if (currentPage + Math.floor(maxPages / 2) >= totalPages) {
    startPage = totalPages - maxPages + 1;
    endPage = totalPages;
  } else {
    startPage = currentPage - Math.floor(maxPages / 2);
    endPage = currentPage + Math.floor(maxPages / 2);
  }

  // Create the array of page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <button
        className={currentPage === 1 ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={currentPage === number ? 'active' : ''}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={currentPage === totalPages ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;