import React, { useState } from 'react';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens'; // Adjust path as needed
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";


const DistributorForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        image: '',
        contact: {
            phone: '',
            email: '',
            whatsapp: '',
            facebook: ''
        },
        distributes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('contact.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                contact: {
                    ...prev.contact,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            distributes: formData.distributes.split(',').map(crop => crop.trim())
        };

        try {
            const token = getToken();
            await Instance.post('/distributors/addDist', payload, {
                headers: {
                    Authorization: token
                }
            });

            toast.success('Distributor added successfully!');
            setFormData({
                name: '',
                location: '',
                image: '',
                contact: {
                    phone: '',
                    email: '',
                    whatsapp: '',
                    facebook: ''
                },
                distributes: ''
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || 'Failed to add distributor');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Dashboard */}
            <button className='text-white text-xl p-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 font-bold absolute top-5 left-10 cursor-pointer rounded shadow-xl flex flex-row justify-between items-center' onClick={() => navigate('/admin/dashboard')}>
                <MdDashboard />
                <span className='ml-2'>Dashboard</span>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Distributor Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block font-medium mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Location *</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Phone *</label>
                        <input
                            type="text"
                            name="contact.phone"
                            value={formData.contact.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email *</label>
                        <input
                            type="email"
                            name="contact.email"
                            value={formData.contact.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">WhatsApp</label>
                        <input
                            type="text"
                            name="contact.whatsapp"
                            value={formData.contact.whatsapp}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Facebook</label>
                        <input
                            type="text"
                            name="contact.facebook"
                            value={formData.contact.facebook}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium mb-1">Distributes Crops (comma-separated)</label>
                    <input
                        type="text"
                        name="distributes"
                        value={formData.distributes}
                        onChange={handleChange}
                        required
                        placeholder="e.g. wheat, rice, maize"
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DistributorForm;
