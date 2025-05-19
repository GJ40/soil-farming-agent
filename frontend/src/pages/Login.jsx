import React, { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setToken, setUser } from "../utils/Tokens";
import { toast } from "react-toastify";

function Login() {
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
        const loginObj = { email, password };
        Instance.post("/users/login", loginObj)
            .then((res) => {
                // console.log(res.message);
                if (res.data.success) {
                    // console.log(res.data.token, res.data.userDoc);
                    setToken(res.data.token);
                    setUser(res.data.userDoc);
                    navigate("/");
                    toast.success(res.data.message)
                }
            })
            .catch((err) => {
                // console.log(err.response);
                toast.error(err.response.data.message)
            });
        event.preventDefault();
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
                    <form className="space-y-4">
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
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green-700 hover:underline cursor-pointer">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;