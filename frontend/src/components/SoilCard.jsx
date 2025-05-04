import React from 'react';

const SoilCard = ({ soil }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row mb-6">
            <img
                src={soil.imageUrl || 'https://images.unsplash.com/photo-1618212624319-3cd9681707e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt={soil.soilType}
                className="w-full md:w-1/3 h-56 object-cover"
            />
            <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{soil.soilType}</h3>
                <p className="text-gray-700 mb-2">{soil.description}</p>
                <p className="text-gray-600 mb-2"><strong>pH Range:</strong> min: {soil.phRange.min || 'N/A'}, max: {soil.phRange.max || 'N/A'}</p>
                <p className="text-gray-600"><strong>Suitable Crops:</strong> {soil.suitableCrops?.join(', ') || 'Not listed'}</p>
            </div>
        </div>
    );
};

export default SoilCard;
