import React, { useEffect, useState } from 'react';
import SoilCard from '../components/SoilCard'; // Adjust path as needed
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens';

function Soils() {
    const [soils, setSoils] = useState([]);
    const [query, setQuery] = useState('');


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
            console.log(err.response);
            alert(err.response.message)
        });
    }


    const searchSoils = async (searchQuery = '') => {
        try {
            const token = getToken();
            await Instance.post('/soils/getSoils',
                { query: searchQuery }, // Request body
                {
                    headers: {
                        Authorization: token, // Auth header
                    },
                }).then((res) => {
                    // console.log(res.data);
                    setSoils(res.data);
                }).catch((err) => {
                    console.log(err.response);
                    alert(err.response.data)
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

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by soil type or description..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-700 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
                >
                    Search
                </button>
            </div>

            {/* Soil Cards */}
            {soils.length > 0 ? (
                soils.map((soil) => <SoilCard key={soil._id} soil={soil} />)
            ) : (
                <p className="text-center text-gray-600">No soils found.</p>
            )}
        </div>
    );
};


export default Soils;
