import React from 'react';
import '../Styling/Search.css'

const Search = ({ data, category, handleInputChange, handleCategoryChange }) => {
    return (
        <div className='search-container'>
            <div className=''>
                <input
                    className='search-input'
                    type="text"
                    value={data}
                    onChange={handleInputChange}
                    placeholder='Type to search users or repositories...'
                />
            </div>
            <div>
                <select
                    className='search-select'
                    value={category}
                    onChange={handleCategoryChange}>
                    <option value="user">Users</option>
                    <option value="repositories">Repositories</option>
                </select>
            </div>
        </div>
    );
}

export default Search;
