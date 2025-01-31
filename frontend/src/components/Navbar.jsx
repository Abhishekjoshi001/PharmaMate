import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import toast from "react-hot-toast"; // Import toast
import { useAuth } from "../context/auth";

function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = async () => { // Fix async keyword placement
    try {
      const response = await axios.post('http://localhost:8000/api/auth/logout');
      if (response && response.data.success) {
        alert(response.data.message);
        setAuth({
          user: null,
          token: ""
        });
        localStorage.removeItem("auth"); // Remove auth from localStorage
        navigate("/");
      } else {
        toast.error(response.data.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error", error);
      toast.error("An error occurred during logout");
    }
  };

  return (
    <>
      <nav className="fixed top-1 left-0">
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => handleNavigate("/")}
              className="border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/inventory")}
              className="border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
            >
              Inventory
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/profile")}
              className="border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/notifications")}
              className="border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
            >
              Notifications
            </button>
          </li>
        </ul>
      </nav>
      <div className="fixed right-2">
        {auth?.user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => handleNavigate("/register")}
              className="border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 m-2 rounded-lg"
            >
              Register
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 m-1 rounded-lg"
            >
              Login
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
