import React, { useState } from 'react';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens';
import { toast } from 'react-toastify';

const UpdateSoilModal = ({ soil, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        ...soil,
        suitableCrops: soil.suitableCrops.join(', '),
        phRange: {
            min: soil.phRange?.min ?? '',
            max: soil.phRange?.max ?? '',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('ph')) {
            setFormData((prev) => ({
                ...prev,
                phRange: {
                    ...prev.phRange,
                    [name === 'phMin' ? 'min' : 'max']: value
                }
            }));
        } else if (name.startsWith('nutrient_')) {
            const nutrient = name.split('_')[1];
            setFormData((prev) => ({
                ...prev,
                nutrients: {
                    ...prev.nutrients,
                    [nutrient]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            suitableCrops: formData.suitableCrops.split(',').map(c => c.trim()),
            phRange: {
                min: parseFloat(formData.phRange.min),
                max: parseFloat(formData.phRange.max),
            },
        };

        try {
            const token = getToken();
            const res = await Instance.put(`/soils/${soil._id}`, payload, {
                headers: { Authorization: token }
            });
            toast.success(res.data.message);
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update soil');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-start pt-10 overflow-auto">
            <div className="bg-white rounded-md p-6 w-full max-w-3xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-green-700">Update Soil Details</h2>
                    <button className="text-red-500 py-1 px-2 hover:bg-red-500 hover:text-white font-bold text-xl rounded cursor-pointer" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <label className='mb-0.5' htmlFor="soilType">Soil Type *</label>
                    <input id='soilType' type="text" name="soilType" value={formData.soilType} onChange={handleChange} required placeholder="Soil Type" className="w-full border p-2 rounded" />
                    <label className='mb-0.5' htmlFor="description">Description *</label>
                    <textarea id='description' name="description" value={formData.description} onChange={handleChange} required placeholder="Description" className="w-full border p-2 rounded" />
                    <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
                    <div id='phRange' className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-6">
                        <span className='mb-0.5'>phRange *</span>
                        <div className="flex flex-row md:items-center space-x-1 md:space-x-6">
                            <div className="flex flex-col md:flex-row md:justify-around md:items-center w-1/2">
                                <label htmlFor="min" className='mr-4'>min</label>
                                <input id='min' type="number" name="phMin" step="0.1" value={formData.phRange.min} onChange={handleChange} required placeholder="pH Min" className="w-full border p-2 rounded" />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-around md:items-center w-1/2">
                                <label htmlFor="max" className='mr-4'>max</label>
                                <input id='max' type="number" name="phMax" step="0.1" value={formData.phRange.max} onChange={handleChange} required placeholder="pH Max" className="w-full border p-2 rounded" />
                            </div>
                        </div>
                    </div>
                    <input type="number" name="moistureContent" value={formData.moistureContent} onChange={handleChange} placeholder="Moisture Content" className="w-full border p-2 rounded" />
                    <div className="flex gap-4 justify-around">
                        {['nitrogen', 'phospohrus', 'potassium'].map(n => (
                            <div key={n} className="flex flex-col w-1/3">
                                <label htmlFor={n}>{n[0].toUpperCase() + n.slice(1, n.length)}</label>
                                <select id={n} key={n} name={`nutrient_${n}`} value={formData.nutrients?.[n] || ''} onChange={handleChange} className="w-full border p-2 rounded">
                                    <option value="">Select</option>
                                    <option value="High">High</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        ))}
                    </div>
                    <input type="text" name="region" value={formData.region || ''} onChange={handleChange} placeholder="Region" className="w-full border p-2 rounded" />
                    <label className='mb-0.5' htmlFor="crops">Suitable Crops *</label>
                    <input id='crops' type="text" name="suitableCrops" value={formData.suitableCrops} onChange={handleChange} placeholder="Suitable Crops (comma-separated)" className="w-full border p-2 rounded" />
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded cursor-pointer hover:bg-red-500 active:bg-red-600 hover:border-white hover:text-white">Cancel</button>
                        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 cursor-pointer">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSoilModal;
