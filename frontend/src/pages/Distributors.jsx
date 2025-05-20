import React, { useEffect, useState } from 'react';
import DistributorCard from '../components/DistributorCard';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens'; // if you use a token utility
import { toast } from 'react-toastify';

const Distributors = () => {
    const [distributors, setDistributors] = useState([]);
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const distsPerPage = 10;


    const fetchDistributors = async () => {
        const token = getToken();
        await Instance.get("/distributors", {
            headers: {
                Authorization: token // Set Authorization header
            },
        }).then((res) => {
            // console.log(res.data);
            setDistributors(res.data);
        }).catch((err) => {
            // console.log(err.response);
            toast.error(err.response.message);
        });
    }


    const searchDistributors = async (searchQuery = '', searchLocation = '') => {
        try {
            const token = getToken();
            await Instance.post('/distributors/getDists',
                { query: searchQuery, location: searchLocation }, // Request body
                {
                    headers: {
                        Authorization: token, // Auth header
                    },
                }).then((res) => {
                    // console.log(res.data);
                    setDistributors(res.data);
                    setCurrentPage(1); // Reset page on search
                }).catch((err) => {
                    // console.log(err.response);
                    toast.error(err.response?.data?.message || "Something went wrong");
                });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchDistributors();
    }, []);

    const handleSearch = () => {
        searchDistributors(query.trim(), location.trim());
    };

    const indexOfLastDist = currentPage * distsPerPage;
    const indexOfFirstDist = indexOfLastDist - distsPerPage;
    const currentDists = distributors.slice(indexOfFirstDist, indexOfLastDist);
    const totalPages = Math.ceil(distributors.length / distsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-full mx-auto px-0 pb-10 pt-0 flex flex-col items-center">

            <div className="min-w-full bg-white top-19 md:top-13 sticky shadow-sm mb-2 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row items-center gap-4 my-6">
                        <div className='flex flex-row w-full space-x-1'>
                            <input
                                type="text"
                                placeholder="Search by name or crop type..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-32 md:w-4 sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-green-700 cursor-pointer w-full md:w-36 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Distributor Cards */}
            <div className="w-full flex justify-center px-4">
                <div className="max-w-6xl">
                    {distributors ?
                        (currentDists.length > 0 ? (
                            currentDists.map((distributor) => (
                                <DistributorCard key={distributor._id} distributor={distributor} fetchDistributors={fetchDistributors} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No distributors found.</p>
                        )) :
                        (<>
                            <p className="text-2xl text-center text-gray-600">Loading...</p>
                        </>)
                    }
                </div>
            </div>

            {/* Pagination Controls */}
            {distributors.length > distsPerPage && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
};

export default Distributors;
