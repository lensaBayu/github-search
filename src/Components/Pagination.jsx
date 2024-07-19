import React from 'react';

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
        <div className='pagination-container'>
            <button
                className='pagination-button'
                onClick={() => onPageChange('prev')}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {currentPage > 1 && pageNumbers[0] > 1 && (
                <>
                    <button className='pagination-number' onClick={() => onPageChange(1)}>1</button>
                    {pageNumbers[0] > 2 && <span className='pagination-ellipsis'>...</span>}
                </>
            )}

            {pageNumbers.map(pageNumber => (
                <button
                    key={pageNumber}
                    className={`pagination-number ${pageNumber === currentPage ? 'current-page' : ''}`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            {currentPage < totalPages && pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className='pagination-ellipsis'>...</span>}
                    <button className='pagination-number' onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            <button
                className='pagination-button'
                onClick={() => onPageChange('next')}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
