import React from 'react';

const Search = ({ data, category, handleInputChange, handleCategoryChange }) => {
    return (
        <div className='search-container'>
            <input
                type="text"
                value={data}
                onChange={handleInputChange}
                placeholder='Type to search users or repositories...'
            />
            <select value={category} onChange={handleCategoryChange}>
                <option value="user">Users</option>
                <option value="repositories">Repositories</option>
            </select>
        </div>
    );
}

export default Search;
