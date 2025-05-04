import React, { useState } from 'react';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens'; // Assumes you use a token utility

const SoilForm = () => {
    const [formData, setFormData] = useState({
        soilType: '',
        description: '',
        image: '',
        phRange: { min: '', max: '' },
        suitableCrops: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phMin' || name === 'phMax') {
            setFormData((prev) => ({
                ...prev,
                phRange: {
                    ...prev.phRange,
                    [name === 'phMin' ? 'min' : 'max']: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            soilType: formData.soilType,
            description: formData.description,
            image: formData.image,
            phRange: {
                min: parseFloat(formData.phRange.min),
                max: parseFloat(formData.phRange.max),
            },
            suitableCrops: formData.suitableCrops
                .split(',')
                .map((crop) => crop.trim()),
        };

        try {
            const token = getToken();
            await Instance.post('/soils/addSoil', payload, {
                headers: {
                    Authorization: token,
                },
            });

            alert('Soil added successfully!');
            setFormData({
                soilType: '',
                description: '',
                image: '',
                phRange: { min: '', max: '' },
                suitableCrops: '',
            });
        } catch (err) {
            console.error(err);
            alert(err.response?.data || 'Failed to add soil');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6 text-green-700">Add Soil Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block font-medium mb-1">Soil Type *</label>
                    <input
                        type="text"
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    ></textarea>
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
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block font-medium mb-1">pH Range Min</label>
                        <input
                            type="number"
                            step="0.1"
                            name="phMin"
                            value={formData.phRange.min}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block font-medium mb-1">pH Range Max</label>
                        <input
                            type="number"
                            step="0.1"
                            name="phMax"
                            value={formData.phRange.max}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium mb-1">Suitable Crops (comma-separated)</label>
                    <input
                        type="text"
                        name="suitableCrops"
                        value={formData.suitableCrops}
                        onChange={handleChange}
                        placeholder="e.g. wheat, rice, corn"
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-700 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-green-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SoilForm;
