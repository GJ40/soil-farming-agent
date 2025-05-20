import React from 'react';
import { useState } from 'react';
import { getToken } from '../utils/Tokens';
import { Instance } from '../utils/Instance';
import { toast } from 'react-toastify';
import DeleteConfirmModal from './DeleteConfirmModal';

function UserTable({ users, fetchUsers }) {
    const [selectedUser, setSelectedUser] = useState('');

    const deleteUser = async (email) => {
        const token = getToken();
        try {
            const res = await Instance.delete("/users/deleteUser",
                {
                    headers: { Authorization: token },
                    data: { email },
                }
            );
            toast.success(res.data.message);
            fetchUsers(); // refresh list
        } catch (err) {
            toast.error(err.response?.data?.message || "Error deleting user");
        } finally {
            setSelectedUser('');
        }
    };
    return (
        <>
            {/* Delete Modal */}
            {selectedUser && (
                <DeleteConfirmModal
                    title="Delete User?"
                    message={`Are you sure you want to delete ${selectedUser}?`}
                    onCancel={() => setSelectedUser(null)}
                    onConfirm={() => deleteUser(selectedUser)}
                />
            )}
            <div className="overflow-x-auto w-full">
                {/* table */}
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100 transition duration-150">
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6 overflow-x-auto">{user.email}</td>
                                <td className="py-3 px-6 capitalize">{user.role}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => setSelectedUser(user.email)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded transition duration-150 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </>
    );
}

export default UserTable;
