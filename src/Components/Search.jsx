import React from 'react';

const Search = ({ data, category, handleInputChange, handleCategoryChange, handleSubmit }) => {
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
                placeholder='Type to search users or repositories'
            />
        </div>
    );
}

export default Search;
