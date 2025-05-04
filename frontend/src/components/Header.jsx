import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { getToken, getUser } from "../utils/Tokens";

function Header() {
    const navigate = useNavigate();
    const token = getToken();
    const user = getUser();

    function logOut() {
        //clear the token
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        // token = false;
        navigate("/");
    }

    return (
        <header className="bg-green-700 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Brand */}
                <span
                    className="text-xl font-bold cursor-pointer hover:text-green-200"
                    onClick={() => navigate('/')}
                >
                    Soil Farming Agent
                </span>

                {/* Nav Links */}
                <nav>
                    {token ?
                        (<div className='space-x-4'>
                            <NavLink to="/" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                Home
                            </NavLink>
                            {user.role === 'admin' ?
                                (<>
                                    <NavLink to="/admin/dashboard" className="px-4 py-2 rounded-md transition active:bg-green-900 hover:bg-green-600">
                                        Dashboard
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
                        </div>)
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

                </nav>
            </div>
        </header>
    );
};

export default Header;
