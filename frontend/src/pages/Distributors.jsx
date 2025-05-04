import React, { useEffect, useState } from 'react';
import DistributorCard from '../components/DistributorCard';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens'; // if you use a token utility

const Distributors = () => {
    const [distributors, setDistributors] = useState([]);
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');


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
            console.log(err.response);
            alert(err.response.message)
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
                }).catch((err) => {
                    console.log(err.response);
                    alert(err.response.data)
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

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by name or crop type..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-4 sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-700 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
                >
                    Search
                </button>
            </div>

            {/* Distributor Cards */}
            {distributors.length > 0 ? (
                distributors.map((distributor) => (
                    <DistributorCard key={distributor._id} distributor={distributor} />
                ))
            ) : (
                <p className="text-center text-gray-600">No distributors found.</p>
            )}
        </div>
    );
};

export default Distributors;
