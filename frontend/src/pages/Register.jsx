import React, { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/Tokens";

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
    }, []);

    function handleSubmit(event) {
        // Your API call here
        const registerObj = { name, email, password };
        Instance.post("/users/register", registerObj)
            .then((res) => {
                console.log(res.data);
                alert(res.data.message);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
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
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register