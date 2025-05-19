import React, { useState } from 'react';
import { getToken, getUser } from '../utils/Tokens';
import { Instance } from '../utils/Instance';
import { toast } from 'react-toastify';
import UpdateDistributorModal from './UpdateDistributorModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const DistributorCard = ({ distributor, fetchDistributors }) => {
    const user = getUser();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        try {
            const token = getToken();
            const res = await Instance.delete(`/distributors/${distributor._id}`, {
                headers: { Authorization: token }
            });
            toast.success(res.data.message);
            setShowDeleteModal(false);
            fetchDistributors();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Delete failed");
            console.error(error);
        }
    };

    const safeText = (val) => val || 'NA';

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row mb-6">
            {showModal && (
                <UpdateDistributorModal
                    distributor={distributor}
                    onClose={() => setShowModal(false)}
                    onUpdated={fetchDistributors}
                />
            )}
            {showDeleteModal && (
                <DeleteConfirmModal
                    title="Confirm Delete"
                    message="Are you sure you want to delete this distributor entry?"
                    onConfirm={() => handleDelete(distributor._id)}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
            <img
                src={distributor.image || 'https://content.jdmagicbox.com/comp/varanasi/x1/0542px542.x542.130516121832.i3x1/catalogue/crop-care-center-english-line-varanasi-agriculture-seed-dealers-7l24a6zhlp.jpg'}
                alt={safeText(distributor.name)}
                className={`w-full h-56 md:h-78 ${user.role === 'admin' ? 'md:w-2/5' : 'md:w-1/3'} object-cover`}
            />
            <div className="p-6 md:w-2/3 md:text-sm">
                <h3 className="text-xl md:text-lg font-semibold text-green-700 mb-2">{safeText(distributor.name)}</h3>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {safeText(distributor.location)}</p>
                <p className="text-gray-700 mb-2"><strong>Contact Person:</strong> {safeText(distributor.contactPerson)}</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> {safeText(distributor?.contact?.phone)}</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> {safeText(distributor?.contact?.email)}</p>
                <p className="text-gray-700 mb-2"><strong>WhatsApp:</strong> {safeText(distributor?.contact?.whatsapp)}</p>
                <p className="text-gray-700 mb-2"><strong>Facebook:</strong> {safeText(distributor?.contact?.facebook)}</p>
                <p className="text-gray-600 mt-2"><strong>Distributes:</strong> {distributor?.distributes?.join(', ') || 'NA'}</p>
                <p className="text-gray-600 mt-2"><strong>Services:</strong> {distributor?.services?.join(', ') || 'NA'}</p>

                {user.role === 'admin' && (
                    <>
                        <hr className="my-4 border-gray-300" />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DistributorCard;
