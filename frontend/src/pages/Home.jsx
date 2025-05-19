import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/Tokens';


function Home() {
    const navigate = useNavigate();
    const token = getToken();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center gap-8 px-6 py-12 max-w-7xl mx-auto">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-green-700 mb-4">
                        Welcome to Soil Farming Agent
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Discover the perfect crops for your soil type and connect with verified crop/seed distributors. Our system empowers farmers and agriculturalists with reliable insights and expert-backed recommendations.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">

                        {token ?
                            (<></>)
                            :
                            (<>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition cursor-pointer"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-white text-green-700 border border-green-700 px-6 py-2 rounded-md cursor-pointer hover:bg-green-100 transition"
                                >
                                    Login
                                </button>
                            </>)
                        }

                    </div>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="https://www.financialexpress.com/wp-content/uploads/2022/09/soil-pixabay.jpg?w=1024"
                        alt="Soil Farming"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold text-green-700 mb-8">What We Offer</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3875/3875071.png"
                                alt="Soil Info"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Soil Information</h3>
                            <p className="text-gray-600">
                                Access detailed insights into various soil types and their properties.
                            </p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2717/2717065.png"
                                alt="Distributors"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Distributors</h3>
                            <p className="text-gray-600">
                                Find nearby verified crop and seed distributors with location and crop type filters.
                            </p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2906/2906274.png"
                                alt="Expert Advice"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Expert Backed</h3>
                            <p className="text-gray-600">
                                All data and recommendations are vetted by soil and crop specialists.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Section */}
            <section className="py-12 bg-gray-100">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">About Us</h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                        Soil Farming Agent is a modern solution built for farmers, agronomists, and agricultural researchers
                        to make informed decisions based on soil characteristics. With verified data from experts and real-time
                        updates by administrators, our goal is to connect users with the right crop and seed resources tailored
                        to their region and soil type.
                    </p>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">Contact Us</h2>
                    <p className="text-gray-700 mb-8">
                        Have questions, feedback, or need help? We'd love to hear from you.
                    </p>

                    <form className="max-w-xl mx-auto space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
}

export default Home;
