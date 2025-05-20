import React, { useState } from 'react';
import { Instance } from '../utils/Instance';
import { getToken } from '../utils/Tokens';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";

const SoilForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        soilType: '',
        description: '',
        image: '',
        phRange: { min: '', max: '' },
        suitableCrops: '',
        moistureContent: '',
        region: '',
        nutrients: {
            nitrogen: '',
            phospohrus: '',
            potassium: '',
        }
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
        } else if (['nitrogen', 'phospohrus', 'potassium'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                nutrients: {
                    ...prev.nutrients,
                    [name]: value,
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
            moistureContent: parseFloat(formData.moistureContent),
            region: formData.region,
            nutrients: {
                nitrogen: formData.nutrients.nitrogen,
                phospohrus: formData.nutrients.phospohrus,
                potassium: formData.nutrients.potassium
            }
        };


        try {
            const token = getToken();
            await Instance.post('/soils/addSoil', payload, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success('Soil added successfully!');
            setFormData({
                soilType: '',
                description: '',
                image: '',
                phRange: { min: '', max: '' },
                suitableCrops: '',
                moistureContent: '',
                region: '',
                nutrients: {
                    nitrogen: '',
                    phospohrus: '',
                    potassium: '',
                }
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || 'Failed to add soil');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 mt-16 md:mt-auto">

            {/* Dashboard */}
            <button className='text-white text-xl p-4 bg-green-600 hover:bg-green-500 active:bg-green-700 font-bold absolute top-5 left-5 cursor-pointer rounded shadow-xl flex flex-row justify-between items-center' onClick={() => navigate('/admin/dashboard')}>
                <MdDashboard />
                <span className='ml-2'>Dashboard</span>
            </button>
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
                    <label className="block font-medium mb-1">Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        required
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
                        <label className="block font-medium mb-1">pH Range Min *</label>
                        <input
                            type="number"
                            step="0.1"
                            name="phMin"
                            value={formData.phRange.min}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block font-medium mb-1">pH Range Max *</label>
                        <input
                            type="number"
                            step="0.1"
                            name="phMax"
                            value={formData.phRange.max}
                            onChange={handleChange}
                            required
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

                <div>
                    <label className="block font-medium mb-1">Moisture Content (%)</label>
                    <input
                        type="number"
                        name="moistureContent"
                        min={0}
                        max={100}
                        value={formData.moistureContent}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Region</label>
                    <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Nutrients</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['nitrogen', 'phospohrus', 'potassium'].map((nutrient) => (
                            <div key={nutrient}>
                                <label className="block capitalize mb-1">{nutrient}</label>
                                <select
                                    name={nutrient}
                                    value={formData.nutrients[nutrient]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                >
                                    <option value="">Select</option>
                                    <option value="High">High</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        ))}
                    </div>
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
