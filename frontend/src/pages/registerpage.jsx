import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../App.css"


function RegisterPage() {
    const [fullname, setFullName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation before making the request
        if (!username || !fullname || !password || !confirmpassword || !phonenumber || !gender || !answer) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmpassword) {
            toast.error("Passwords don't match.");
            return;
        }

        console.log("Submitting form");
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                fullname,
                username,
                password,
                confirmpassword,
                phonenumber,
                gender,
                answer
            });
            if (response && response.data.success) {
                toast.success(response.data.message);
                navigate("/")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Username already exists");
            } else {
                console.error("Registration error", error);
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="registerpage">
            <form onSubmit={handleRegister} className="flex flex-col items-center space-y-4 p-4 register-components">
                <input type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder="Fullname" className="border p-2" required />

                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="border p-2" required />

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2" required />

                <input type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="border p-2" required />

                <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number" className="border p-2" required />

                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" className="border p-2" required />

                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="What is your pet name?" className="border p-2" required />

                <button type="submit" className="bg-green-500 hover:bg-green-950 hover:text-white p-2 rounded">
                    Register </button>
            </form>
        </div>
    )
}

export default RegisterPage;