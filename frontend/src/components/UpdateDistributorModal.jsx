import React, { useState } from 'react';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens';
import { toast } from 'react-toastify';

const UpdateDistributorModal = ({ distributor, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        ...distributor,
        distributes: distributor.distributes.join(', '),
        services: distributor.services?.join(', ') || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            distributes: formData.distributes.split(',').map(d => d.trim()),
            services: formData.services?.split(',').map(s => s.trim()) || [],
        };


        try {
            const token = getToken();
            await Instance.put(`/distributors/${distributor._id}`, payload, {
                headers: { Authorization: token }
            });
            toast.success('Distributor updated successfully!');
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update distributor');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-start pt-10 overflow-auto">
            <div className="bg-white rounded-md p-6 w-full max-w-2xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-green-700">Update Distributor</h2>
                    <button className="text-red-500 py-1 px-2 hover:bg-red-500 hover:text-white font-bold text-xl rounded cursor-pointer" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="">
                        <label className='mb-0.5' htmlFor="name">Name *</label>
                        <input id='name' type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full border p-2 rounded" />
                    </div>
                    <div className="">
                        <label className='mb-0.5' htmlFor="location">Location *</label>
                        <input id='location' type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="Location" className="w-full border p-2 rounded" />
                    </div>
                    <input type="text" name="image" value={formData.image || ''} onChange={handleChange} placeholder="Image URL (optional)" className="w-full border p-2 rounded" />
                    <div className="">
                        <p className='mb-0.5 font-medium'>Contacts</p>
                        <div className="space-y-0.5">
                            <div className='w-full flex flex-col md:flex-row space-y-1 md:space-x-1'>
                                <div className="w-full md:w-1/2">
                                    <label className='mb-0.5' htmlFor="phone">Phone *</label>
                                    <input id='phone' type="text" name="contact.phone" value={formData.contact.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className='mb-0.5' htmlFor="email">Email *</label>
                                    <input id='email' type="email" name="contact.email" value={formData.contact.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
                                </div>
                            </div>
                            <div className='w-full flex flex-col md:flex-row space-y-1 md:space-x-1'>
                                <div className="w-full md:w-1/2">
                                    <label className='mb-0.5' htmlFor="whatsapp">Whatsapp</label>
                                    <input id='whatsapp' type="text" name="contact.whatsapp" value={formData.contact.whatsapp || ''} onChange={handleChange} placeholder="WhatsApp (optional)" className="w-full border p-2 rounded" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className='mb-0.5' htmlFor="facebook">Facebook</label>
                                    <input id='facebook' type="text" name="contact.facebook" value={formData.contact?.facebook || ''} onChange={handleChange} placeholder="Facebook URL" className="w-full border p-2 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-0.5">
                        <p className='font-medium'>Contact Person and Services</p>
                        <div className="flex flex-col items-center space-y-1 md:flex-row md:justify-between">
                            <input type="text" name="contactPerson" value={formData.contactPerson || ''} onChange={handleChange} placeholder="Contact Person name" className="border p-2 rounded w-full md:w-1/3" />
                            <input type="text" name="services" value={formData.services || ''} onChange={(e) => setFormData({ ...formData, services: e.target.value })} placeholder="Services (comma-separated)" className="border p-2 rounded w-full md:w-2/3 md:ml-1" />
                        </div>
                    </div>
                    <div className="space-y-0 5">
                        <label htmlFor="distributes">Distributes *</label>
                        <input id='distributes' type="text" name="distributes" value={formData.distributes} onChange={handleChange} placeholder="Distributes (comma-separated)" className="w-full border p-2 rounded" />

                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded cursor-pointer hover:bg-red-500 active:bg-red-600 hover:border-white hover:text-white">Cancel</button>
                        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 cursor-pointer">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDistributorModal;
