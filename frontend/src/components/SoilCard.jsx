import React from 'react';
import { getToken, getUser } from '../utils/Tokens';
import { useState } from 'react';
import UpdateSoilModal from './UpdateSoilModal';
import { Instance } from '../utils/Instance';
import { toast } from 'react-toastify';
import DeleteConfirmModal from './DeleteConfirmModal';

const SoilCard = ({ soil, fetchSoils }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const user = getUser();
    const colors = {
        'Low': 'text-white p-1 bg-lime-500 rounded',
        'Moderate': 'text-white p-1 bg-yellow-500 rounded',
        'High': 'text-white p-1 bg-red-400 rounded'
    }

    const handleDelete = async (id) => {
        try {
            const token = getToken();
            const res = await Instance.delete(`/soils/${id}`, {
                headers: { Authorization: token }
            });
            toast.success(res.data.message);
            setShowDeleteModal(false);
            // refreshData(); // or navigate or update local state
            fetchSoils();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row mb-6 w-full">
            {showModal && (
                <UpdateSoilModal
                    soil={soil}
                    onClose={() => setShowModal(false)}
                    onUpdated={fetchSoils}
                />
            )}
            {showDeleteModal && (
                <DeleteConfirmModal
                    title="Confirm Delete"
                    message="Are you sure you want to delete this soil entry?"
                    onConfirm={() => handleDelete(soil._id)}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
            <img
                src={soil.imageUrl || 'https://images.unsplash.com/photo-1618212624319-3cd9681707e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt={soil.soilType}
                className={`w-full h-56 md:h-78 ${(user.role === 'admin' ? 'md:w-2/5' : 'md:w-1/3')} object-cover`}
            />
            <div className="p-6 md:w-2/3 text-sm md:text-normal">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{soil.soilType}</h3>
                <p className="text-gray-700 mb-2">{soil.description}</p>
                <p className="text-gray-600 mb-2"><strong>pH Range:</strong> min: {soil.phRange.min || 'N/A'}, max: {soil.phRange.max || 'N/A'}</p>
                <p className="text-gray-600"><strong>Suitable Crops:</strong> {soil.suitableCrops?.join(', ') || 'Not listed'}</p>
                <p className="text-gray-700"><strong>Moisture Content%:</strong> {soil.moistureContent ?? 'NA'}</p>
                <p className="text-gray-700"><strong>Region:</strong> {soil.region || 'NA'}</p>
                <div className="text-gray-700">
                    <strong>Nutrients:</strong>
                    <ul className="ml-4 flex flex-row justify-around">
                        <li>Nitrogen: {(soil.nutrients?.nitrogen && <span className={colors[soil.nutrients?.nitrogen]}>{soil.nutrients?.nitrogen}</span>) || 'NA'}</li>
                        <li>Phosphorus: {(soil.nutrients?.phospohrus && <span className={colors[soil.nutrients?.phospohrus]}>{soil.nutrients?.phospohrus}</span>) || 'NA'}</li>
                        <li>Potassium: {(soil.nutrients?.potassium && <span className={colors[soil.nutrients?.potassium]}>{soil.nutrients?.potassium}</span>) || 'NA'}</li>
                    </ul>
                </div>



                {/* Admin Actions */}
                {user.role === 'admin' && (
                    <>
                        {/* Horizontal Separator */}
                        <hr className="my-4 border-gray-300" />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {

                                    setShowModal(true)
                                }}
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

export default SoilCard;
