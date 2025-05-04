import React from 'react';

const DistributorCard = ({ distributor }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row mb-6">
            <img
                src={distributor.image || 'https://content.jdmagicbox.com/comp/varanasi/x1/0542px542.x542.130516121832.i3x1/catalogue/crop-care-center-english-line-varanasi-agriculture-seed-dealers-7l24a6zhlp.jpg'}
                alt={distributor.name}
                className="w-full md:w-1/3 h-56 object-cover"
            />
            <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{distributor.name}</h3>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {distributor.location}</p>
                <p className="text-gray-700 mb-2"><strong>Contact:</strong> {distributor.contact.phone} | {distributor.contact.email}</p>
                {distributor.contact.whatsapp && (
                    <p className="text-gray-600"><strong>WhatsApp:</strong> {distributor.contact.whatsapp}</p>
                )}
                <p className="text-gray-600 mt-2">
                    <strong>Distributes:</strong> {distributor.distributes?.join(', ') || 'Not listed'}
                </p>
            </div>
        </div>
    );
};

export default DistributorCard;
