import React, { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/Tokens";
import { toast } from "react-toastify";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate("/");
        }
    });

    function handleSubmit(event) {
        // Your API call here
        const registerObj = { name, email, password };
        Instance.post("/users/register", registerObj)
            .then((res) => {
                // console.log(res.data);
                toast.success(res.data.message);
                navigate("/login");
            })
            .catch((err) => {
                // console.log(err.response.data.message);
                toast.error(err.response.data.message);
                Object.entries(registerObj).forEach(([key, value]) => {
                    if (!value) {
                        const element = document.getElementById(key);
                        if (element) {
                            element.classList.remove('focus:ring-green-500');
                            element.classList.add('focus:ring-red-500');
                        }
                    }
                });
            });
        event.preventDefault();
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Register</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition cursor-pointer"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-700 hover:underline cursor-pointer">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register