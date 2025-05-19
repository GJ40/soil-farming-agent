import React, { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import { useNavigate } from "react-router-dom";
import { getToken, getUser, setToken, setUser } from "../utils/Tokens";
import { toast } from "react-toastify";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const token = getToken();
        const user = getUser()
        if (token && user.role === 'admin') {
            navigate("/");
        }
    }, []);


    function handleSubmit(event) {
        // Your API call here
        const loginObj = { email, password };
        Instance.post("/users/adminLogin", loginObj)
            .then((res) => {
                console.log(res.data);
                toast.success(res.data.message);
                setToken(res.data.token);
                setUser(res.data.userDoc);
                navigate("/");

            })
            .catch((err) => {
                console.log(err);
                toast.error(err.data.message);
            });
        event.preventDefault();
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Admin Login</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin