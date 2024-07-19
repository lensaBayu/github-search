import React from 'react';
import '../Styling/Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 3;
    const pageNumbers = [];

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <div
                className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange('prev')}
                disabled={currentPage === 1}
            >
                Previous
            </div>

            {currentPage > 1 && pageNumbers[0] > 1 && (
                <>
                    <div className="pagination-button" onClick={() => onPageChange(1)}>1</div>
                    {pageNumbers[0] > 2 && <span className="pagination-dots">...</span>}
                </>
            )}

            {pageNumbers.map(pageNumber => (
                <div
                    key={pageNumber}
                    className={`pagination-button ${currentPage === pageNumber ? 'active' : 'inactive'}`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </div>
            ))}

            {currentPage < totalPages && pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="pagination-dots">...</span>}
                    <div className="pagination-button inactive" onClick={() => onPageChange(totalPages)}>{totalPages}</div>
                </>
            )}

            <div
                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange('next')}
                disabled={currentPage === totalPages}
            >
                Next
            </div>
        </div>
    );
};

export default Pagination;
