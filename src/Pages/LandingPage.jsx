import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Search from '../Components/Search';
import Card from '../Components/Card';

const LandingPage = () => {
    const [data, setData] = useState('');
    const [category, setCategory] = useState('user');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (query, page = 1) => {
        if (!query.trim()) {
            // Don't make an API call if the query is empty
            return;
        }

        const baseURL = 'https://api.github.com/search';
        const perPage = 25;
        let url = '';

        if (category === 'user') {
            url = `${baseURL}/users?q=${query}&page=${page}&per_page=${perPage}`;
        } else if (category === 'repositories') {
            url = `${baseURL}/repositories?q=${query}&page=${page}&per_page=${perPage}`;
        }

        try {
            console.log(url);
            const response = await axios.get(url);
            setResults(response.data.items);
            setTotalPages(Math.ceil(response.data.total_count / perPage));
            console.log(response.data.items);
        } catch (error) {
            console.error('Error fetching data from GitHub API', error);
        }
    };

    const debouncedFetchData = useCallback(
        debounce((query) => {
            fetchData(query, 1);
        }, 500),
        [category]
    );

    const handleInputChange = (e) => {
        const newData = e.target.value;
        setData(newData);
        setCurrentPage(1);
        debouncedFetchData(newData);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
        fetchData(data, 1);
    };

    const handleSubmit = () => {
        setCurrentPage(1);
        fetchData(data, 1);
    };

    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === 'prev' && currentPage > 1) {
            newPage = currentPage - 1;
        } else if (direction === 'next' && currentPage < totalPages) {
            newPage = currentPage + 1;
        }
        setCurrentPage(newPage);
        fetchData(data, newPage);
    };

    useEffect(() => {
        if (data) {
            fetchData(data, currentPage);
        }
    }, [category, currentPage]);

    return (
        <div>
            <h1>Landing Page</h1>
            <Search
                data={data}
                category={category}
                handleInputChange={handleInputChange}
                handleCategoryChange={handleCategoryChange}
                handleSubmit={handleSubmit}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <div>
                {results.length > 0 && (
                    <ul>
                        {results.map((result, index) => (
                            <Card key={index} result={result} category={category} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
