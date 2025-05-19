import React, { useEffect, useState } from 'react';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens';
import { toast } from 'react-toastify';
import UserTable from '../components/UserTable';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

function Users() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        const token = getToken();
        try {
            const res = await Instance.get("/users", {
                headers: { Authorization: token }
            });
            setUsers(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching users");
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (searchQuery = '') => {
        if (!searchQuery.trim()) return fetchUsers();
        const token = getToken();
        Instance.post('/users/getUsers',
            { query: searchQuery },
            { headers: { Authorization: token } }
        ).then((res) => {
            setUsers(res.data);
            setCurrentPage(1);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Search failed");
        });
    };

    return (
        <div className="w-full mx-auto px-0 pb-10 pt-0 flex flex-col items-center">
            {/* Search */}
            <div className="min-w-full bg-white top-13 sticky shadow-sm mb-2 px-4 z-1">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-4 my-6">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={() => handleSearch(query)}
                            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="w-full max-w-6xl px-4">
                {users.length > 0 ? (
                    <UserTable users={currentUsers} fetchUsers={fetchUsers} />
                ) : (
                    <p className="text-center text-gray-600">No users found.</p>
                )}
            </div>

            {/* Pagination */}
            {users.length > usersPerPage && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
}

export default Users;
