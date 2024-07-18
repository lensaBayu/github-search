import React from 'react';

const Search = ({ data, category, handleInputChange, handleCategoryChange, handleSubmit, currentPage, totalPages, handlePageChange }) => {
    return (
        <div>
            <select value={category} onChange={handleCategoryChange}>
                <option value="user">User</option>
                <option value="repositories">Repositories</option>
            </select>
            <input
                type="text"
                value={data}
                onChange={handleInputChange}
                placeholder='Type to search repositories or users'
            />
            <button onClick={handleSubmit}>Search</button>

            {totalPages > 1 && (
                <div>
                    <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Search;
