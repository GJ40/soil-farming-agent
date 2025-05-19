import React, { useEffect, useState } from 'react';
import SoilCard from '../components/SoilCard'; // Adjust path as needed
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens';
import { toast } from 'react-toastify';

function Soils() {
    const [soils, setSoils] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const soilsPerPage = 10;


    const fetchSoils = async () => {
        const token = getToken();
        await Instance.get("/soils", {
            headers: {
                Authorization: token // Set Authorization header
            },
        }).then((res) => {
            // console.log(res.data);
            setSoils(res.data);
        }).catch((err) => {
            // console.log(err.response);
            toast.error(err.response.message)
        });
    }


    const searchSoils = async (searchQuery = '') => {
        try {
            const token = getToken();
            await Instance.post('/soils/getSoils',
                { query: searchQuery },
                {
                    headers: {
                        Authorization: token, // Auth header
                    },
                }).then((res) => {
                    // console.log(res.data);
                    setSoils(res.data);
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
        fetchSoils();
    }, []);

    const handleSearch = () => {
        searchSoils(query.trim());
    };

    const indexOfLastSoil = currentPage * soilsPerPage;
    const indexOfFirstSoil = indexOfLastSoil - soilsPerPage;
    const currentSoils = soils.slice(indexOfFirstSoil, indexOfLastSoil);
    const totalPages = Math.ceil(soils.length / soilsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-full mx-auto px-0 pb-10 pt-0 flex flex-col items-center">

            <div className="min-w-full bg-white top-13 md:top-13 sticky shadow-sm mb-2 px-4 z-1">
                <div className="max-w-6xl mx-auto">
                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row items-center gap-4 my-6">
                        <input
                            type="text"
                            placeholder="Search by soil type or description..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-green-700 cursor-pointer text-white px-6 py-2 rounded-md w-full md:w-34 hover:bg-green-800 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Soil Cards */}
            <div className="w-full flex justify-center px-4">
                <div className="max-w-6xl">
                    {currentSoils.length > 0 ? (
                        currentSoils.map((soil) => (
                            <SoilCard key={soil._id} soil={soil} fetchSoils={fetchSoils} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No soils found.</p>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {soils.length > soilsPerPage && (
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


export default Soils;
