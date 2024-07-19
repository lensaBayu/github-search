import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Search from '../Components/Search';
import Card from '../Components/Card';
import Pagination from '../Components/Pagination'; // Import Pagination component

const LandingPage = () => {
    const [data, setData] = useState('');
    const [category, setCategory] = useState('user');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (query, page = 1) => {
        if (!query.trim()) {
            setResults([]);
            setTotalPages(1);
            return;
        }

        const baseURL = 'https://api.github.com/search';
        const perPage = 20;
        let url = '';

        if (category === 'user') {
            url = `${baseURL}/users?q=${query}&page=${page}&per_page=${perPage}`;
        } else if (category === 'repositories') {
            url = `${baseURL}/repositories?q=${query}&page=${page}&per_page=${perPage}`;
        }

        try {
            setIsLoading(true);
            const response = await axios.get(url);
            setResults(response.data.items);
            setTotalPages(Math.ceil(response.data.total_count / perPage));
            console.log(response.data.items);
        } catch (error) {
            console.error('Error fetching data from GitHub API', error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedFetchData = useCallback(
        debounce((query, page) => {
            if (query.trim()) {
                fetchData(query, page);
            } else {
                setResults([]);
                setTotalPages(1);
            }
        }, 500),
        [category]
    );

    const handleInputChange = (e) => {
        const newData = e.target.value;
        setData(newData);
        setCurrentPage(1);

        debouncedFetchData(newData, 1);
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

    const handlePageChange = (page) => {
        let newPage = currentPage;

        if (page === 'prev') {
            newPage = Math.max(currentPage - 1, 1);
        } else if (page === 'next') {
            newPage = Math.min(currentPage + 1, totalPages);
        } else {
            newPage = page; // Direct page number
        }

        if (newPage !== currentPage) {
            setCurrentPage(newPage);
            fetchData(data, newPage);
        }
    };

    useEffect(() => {
        if (data) {
            fetchData(data, currentPage);
        }
    }, [category]);

    return (
        <div className='container'>
            <div className='header'>
                <img src="./Logo.png" alt="logoGitHub" className='logo' />
                <div className='header-text'>
                    <h1>GitHub Searcher</h1>
                    <h3>Search users or repositories below</h3>
                </div>
            </div>

            <Search
                data={data}
                category={category}
                handleInputChange={handleInputChange}
                handleCategoryChange={handleCategoryChange}
                handleSubmit={handleSubmit}
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {results.length > 0 ? (
                        <div className='card-container'>
                            {results.map((result, index) => (
                                <Card key={index} result={result} category={category} />
                            ))}
                        </div>
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default LandingPage;
