import React, { useState } from "react";

const Pagination = ({ totalPages, onPageChange }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
    onPageChange(page);
  };

 // Inside the Pagination component

const renderPageNumbers = () => {
    const pageNumbers = [];
  
    // Display the first few page numbers
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <a href="#!" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </li>
      );
    }
  
    // Display ellipsis if needed
    if (totalPages > 5) {
      pageNumbers.push(
        <li key="ellipsis" className="ellipsis">
          <span>...</span>
        </li>
      );
    }
  
    // Display the last two page numbers
    for (let i = Math.max(totalPages - 1, 6); i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <a href="#!" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </li>
      );
    }
  
    return pageNumbers;
  };
  

  return (
    <ul className="pagination">
      <li
        className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          if (currentPage > 1) handlePageClick(currentPage - 1);
        }}
      >
        <a href="#!">Previous</a>
      </li>
      {renderPageNumbers()}
      <li
        className={`next ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => {
          if (currentPage < totalPages) handlePageClick(currentPage + 1);
        }}
      >
        <a href="#!">Next</a>
      </li>
    </ul>
  );
};

export default Pagination;
