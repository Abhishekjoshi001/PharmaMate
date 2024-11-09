import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-blue-300 p-3 flex justify-left items-center">
      <ul className="flex space-x-6">
        <li>
          <button
            onClick={() => handleNavigate("/")}
            className=" border border-black border-solid hover:bg-gray-600 hover:text-white bg-gray-300 p-1 rounded-lg"
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
  );
}

export default Navbar;
