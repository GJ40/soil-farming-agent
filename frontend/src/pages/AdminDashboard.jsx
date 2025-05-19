import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSeedling, FaTractor, FaPlusCircle, FaEye } from 'react-icons/fa';
import { getToken, getUser } from '../utils/Tokens';
import { Pie, Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import { toast } from 'react-toastify';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Instance } from '../utils/Instance';
import { useState } from 'react';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        const user = getUser();

        if (!(token && user.role === 'admin')) {
            navigate("/login");
        }

        const dashboard = async () => {
            await Instance.get('/admin/dashboard', {
                Authorization: token,
            }).then((res) => {
                // console.log(res.data);
                setData(res.data);
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            }).finally(() => {
                setLoading(false);
            });
        }

        dashboard();
    }, [])


    const cropDistributionData = {
        labels: ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Maize'],
        // labels: data?.pieCharts?.cropStats?.cropNames ?? [],
        datasets: [
            {
                label: 'Distributors per Crop',
                // data: data?.pieCharts?.cropStats?.counts ?? [],
                data: [1, 1, 1, 1, 1],
                backgroundColor: ['#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa'],
                // backgroundColor: randomColor({ luminosity: 'white', count: data?.pieCharts?.cropStats?.cropNames.length ?? 0, hue: 'random' }),
                borderWidth: 1,
            },
        ],
    };

    const soilTypesData = {
        labels: ['Black Soil', 'Red Soil', 'Alluvial', 'Mountain Soil', 'Desert Soil'],
        datasets: [
            {
                label: 'Soil Types',
                data: [2, 1, 1, 1, 1],
                backgroundColor: ['#6b7280', '#ef4444', '#f59e0b', '#10b981', ...randomColor({ luminosity: 'dark', count: 1, hue: 'random' })],
                // backgroundColor: randomColor({ luminosity: 'black', count: 4, hue: 'simple' }),
                borderWidth: 1,
            },
        ],
    };

    const barChartData = {
        labels: ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Maize'],
        datasets: [
            {
                label: 'Distributors per Crop',
                data: [4, 3, 5, 2, 6],
                backgroundColor: '#3b82f6',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Manage Soils */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                        <div className="flex items-center space-x-4 mb-4">
                            <FaSeedling className="text-green-600 text-3xl" />
                            <h2 className="text-xl font-semibold text-gray-700">Soil Management</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Add, view, or update soil types and their properties for users to access.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to="/admin/soilform"
                                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                <FaPlusCircle className="mr-2" /> Add Soil
                            </Link>
                            <Link
                                to="/soils"
                                className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                <FaEye className="mr-2" /> View Soils
                            </Link>
                        </div>
                    </div>

                    {/* Manage Distributors */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                        <div className="flex items-center space-x-4 mb-4">
                            <FaTractor className="text-yellow-600 text-3xl" />
                            <h2 className="text-xl font-semibold text-gray-700">Distributor Management</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Manage distributors, their crop types, and contact information.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to="/admin/distform"
                                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                <FaPlusCircle className="mr-2" /> Add Distributor
                            </Link>
                            <Link
                                to="/distributors"
                                className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                <FaEye className="mr-2" /> View Distributors
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8">
                    {loading ?
                        (<>
                            <div className="max-w-7xl mx-auto mt-8 text-center">
                                <p><span className='text-center text-2xl text-stone-500'>Loading...</span></p>
                            </div>
                        </>) :
                        (<>
                            {/* Data Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                                <div className="bg-white shadow-md rounded p-4 text-center border">
                                    <h2 className="text-lg text-gray-600">Total Soils</h2>
                                    <p className="text-2xl font-bold text-green-600">{data?.dataCards?.soilCount || 'NA'}</p>
                                </div>
                                <div className="bg-white shadow-md rounded p-4 text-center border">
                                    <h2 className="text-lg text-gray-600">Total Distributors</h2>
                                    <p className="text-2xl font-bold text-blue-600">{data?.dataCards?.distCount || 'NA'}</p>
                                </div>
                                <div className="bg-white shadow-md rounded p-4 text-center border">
                                    <h2 className="text-lg text-gray-600">Crop Types</h2>
                                    <p className="text-2xl font-bold text-purple-600">{data?.dataCards?.cropTypes || 'NA'}</p>
                                </div>
                                <div className="bg-white shadow-md rounded p-4 text-center border">
                                    <h2 className="text-lg text-gray-600">Active Locations</h2>
                                    <p className="text-2xl font-bold text-yellow-600">{data?.dataCards?.activeLocationCount || 'NA'}</p>
                                </div>
                            </div>

                            {/* Pie Charts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div className="bg-white p-4 shadow-md rounded border">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Crop Distribution (Distributors)</h3>
                                    <Pie data={cropDistributionData} />
                                </div>
                                <div className="bg-white p-4 shadow-md rounded border">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Soil Type Distribution</h3>
                                    <Pie data={soilTypesData} />
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="bg-white p-6 shadow-md rounded border">
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Distributors per Crop</h3>
                                <Bar data={barChartData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        title: { display: true, text: 'Distributors by Crop Type' }
                                    }
                                }} />
                            </div>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
