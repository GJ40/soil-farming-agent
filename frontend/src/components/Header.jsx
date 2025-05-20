import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { getToken, getUser, removeToken, removeUser } from "../utils/Tokens";
import { Instance } from '../utils/Instance';
import { toast } from 'react-toastify';
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";


function Header() {
    const navigate = useNavigate();
    const token = getToken();
    const user = getUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logOut = async () => {
        try {
            //clear the token
            removeToken();
            removeUser();
            const res = await Instance.post('/users/logout');
            // setTimeout(() => {
            //     navigate("/");
            // }, 3000);
            navigate("/");
            toast.success(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error(error.data.message);
        }
    }

    return (
        <header className="bg-green-700 text-white shadow-md w-full top-0 sticky z-1">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Brand */}
                <span
                    className="text-xl font-bold cursor-pointer hover:text-green-200"
                    onClick={() => navigate('/')}
                >
                    Soil Farming Agent
                </span>

                <div>
                    {/* Nav Links */}

                    {token ?
                        (<nav>
                            <div className='hidden md:block space-x-4'>
                                {/* <NavLink to="/" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                    Home
                                </NavLink> */}
                                {user.role === 'admin' ?
                                    (<>
                                        <NavLink to="/admin/dashboard" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                            Dashboard
                                        </NavLink>
                                        <NavLink to="/admin/users" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                            Users
                                        </NavLink>
                                    </>) :
                                    (<></>)
                                }
                                <NavLink to="/soils" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                    Soils
                                </NavLink>
                                <NavLink to="/distributors" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                    Distributors
                                </NavLink>
                                {/* {user.role === 'admin' ?
                                (<>
                                    <NavLink to="/admin/soilform" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                        Soil Form
                                    </NavLink>
                                    <NavLink to="/admin/distform" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                        Distributor Form
                                    </NavLink>
                                </>) :
                                (<></>)
                            } */}
                                <span
                                    onClick={logOut}
                                    className="px-4 py-2 rounded-md transition cursor-pointer active:bg-green-900 active:text-white hover:bg-white hover:text-green-600"
                                >
                                    Logout
                                </span>
                            </div>
                            <div className="relative md:hidden z-10">
                                {/* Toggle Button */}
                                <button
                                    onClick={toggleMenu}
                                    className="text-3xl px-2 py-1 m-2 text-white bg-green-700 rounded-md focus:outline-none cursor-pointer"
                                >
                                    {isOpen ? <HiMenuAlt1 /> : <HiMenu />}
                                </button>

                                {/* Sliding Menu */}
                                <div
                                    className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                                        }`}
                                >
                                    <div className="text-xl space-y-2 p-4">
                                        <NavLink
                                            to="/"
                                            className="mb-4 font-bold block px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                            onClick={toggleMenu}
                                        >
                                            Soil Farming Agent
                                        </NavLink>
                                        {user.role === 'admin' && (
                                            <>
                                                <NavLink
                                                    to="/admin/dashboard"
                                                    className="block px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                                    onClick={toggleMenu}
                                                >
                                                    Dashboard
                                                </NavLink>
                                                <NavLink
                                                    to="/admin/users"
                                                    className="block px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                                    onClick={toggleMenu}
                                                >
                                                    Users
                                                </NavLink>
                                            </>
                                        )}
                                        <NavLink
                                            to="/soils"
                                            className="block px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                            onClick={toggleMenu}
                                        >
                                            Soils
                                        </NavLink>
                                        <NavLink
                                            to="/distributors"
                                            className="block px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                            onClick={toggleMenu}
                                        >
                                            Distributors
                                        </NavLink>
                                        <hr className='text-white mx-auto my-4' />
                                        <span
                                            onClick={() => {
                                                logOut();
                                                toggleMenu();
                                            }}
                                            className="block px-4 py-2 rounded-md transition cursor-pointer active:bg-green-900 active:text-white hover:bg-white hover:text-green-600"
                                        >
                                            Logout
                                        </span>
                                    </div>
                                </div>

                                {/* Optional Overlay */}
                                {isOpen && (
                                    <div
                                        className="fixed inset-0 bg-black opacity-30 z-40"
                                        onClick={toggleMenu}
                                    ></div>
                                )}
                            </div>
                        </nav>)
                        :
                        (<div>
                            <Link to="/login">
                                <span
                                    className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                >
                                    Login
                                </span>
                            </Link>
                            <Link to="/register">
                                <span
                                    className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600"
                                >
                                    Register
                                </span>
                            </Link>
                        </div>)

                    }
                </div>

            </div>
        </header>
    );
};

export default Header;
