import React from 'react';
import './PaginationString.scss'; // Создайте файл стилей для пагинации

const PaginationString = ({ pageCount, activePage, onPageClick }) => {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="pagination-string">
    <div className="pagination-string__bar">
      {pages.map((page) => (
        <div
          key={page}
          className={`pagination-string__bar-fill ${page === activePage ? 'active' : ''}`}
          onClick={() => onPageClick(page)}
        />
      ))}
    </div>
  </div>
  );
};

export default PaginationString;
