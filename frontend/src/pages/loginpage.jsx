import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import "../App.css"


function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation before making the request
        if (!username || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        console.log("Submitting form");
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                username,
                password,
            });
            if (response && response.data.success) {
                toast.success(response.data.message)
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(response.data))
                console.log("Stored Auth Data:", localStorage.getItem("auth"));
                navigate("/")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid username or password");
            } else {
                console.error("Login error", error);
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="registerpage">
            <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4 p-4 register-components">

                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="border p-2" required />

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2" required />

                <button type="submit" className="bg-green-500 hover:bg-green-950 hover:text-white p-2 rounded">
                    Login </button>
            </form>
        </div>
    )
}

export default Login;