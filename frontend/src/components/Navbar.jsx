import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Navbar() {
  const navigate = useNavigate(); // Create navigate function

  // Handler for button clicks to navigate
  const handleNavigate = (path) => {
    navigate(path); // Navigate to the desired path
  };

  return (
    <nav className="bg-blue-300 p-3 flex justify-left items-center">
      <ul className="flex space-x-6">
        {/* Home button */}
        <li>
          <button
            onClick={() => handleNavigate("/")} // Handle click to navigate
            className="text-black border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
          >
            Home
          </button>
        </li>
        
        {/* Inventory button */}
        <li>
          <button
            onClick={() => handleNavigate("/inventory")}
            className="text-black border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
          >
            Inventory
          </button>
        </li>
        
        {/* Profile button */}
        <li>
          <button
            onClick={() => handleNavigate("/profile")}
            className="text-black border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
          >
            Profile
          </button>
        </li>
        
        {/* Notifications button */}
        <li>
          <button
            onClick={() => handleNavigate("/notifications")}
            className="text-black border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
          >
            Notifications
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
