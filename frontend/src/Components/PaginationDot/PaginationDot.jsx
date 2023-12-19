// PaginationDots.jsx
import React from 'react';
import './PaginationDot.scss';

const PaginationDot = ({ pageCount, activePage, onPageClick }) => {
  const dots = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="pagination-dots">
      {dots.map((dot) => (
        <div
          key={dot}
          className={`pagination-dots__dot ${dot === activePage ? 'active' : ''}`}
          onClick={() => onPageClick(dot)}
        />
      ))}
    </div>
  );
};

export default PaginationDot;
