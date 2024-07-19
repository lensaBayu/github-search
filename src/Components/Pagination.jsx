import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 3;
    const pageNumbers = [];

    // Determine the range of pages to display
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Adjust startPage if not enough pages to show
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    // Generate page numbers to display
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <button onClick={() => onPageChange('prev')} disabled={currentPage === 1}>Previous</button>

            {currentPage > 1 && pageNumbers[0] > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {pageNumbers[0] > 2 && <span>...</span>}
                </>
            )}

            {pageNumbers.map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    disabled={pageNumber === currentPage}
                >
                    {pageNumber}
                </button>
            ))}

            {currentPage < totalPages && pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span>...</span>}
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            <button onClick={() => onPageChange('next')} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;
