import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMedicine() {
  const [medicinePic, setMedicinePic] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [noOfTabs, setNoOfTabs] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if the user is logged in (authentication)
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      // Redirect to login page if no token found
      navigate("/login");
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!medicineName || !expiry || !category || !dosage) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("medicinePic", medicinePic);
      formData.append("medicineName", medicineName);
      formData.append("noOfTabs", noOfTabs);
      formData.append("expiry", expiry);
      formData.append("category", category);
      formData.append("dosage", dosage);

      // Send data to the backend to add the medicine
      await axios.post('http://localhost:8000/api/auth/addMedicine', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("auth")}`, // Attach token in the header
        },
      });

      // Redirect after successfully adding the medicine
      navigate("/inventory");
    } catch (error) {
      console.error("Error adding medicine:", error);
      setError("Failed to add medicine. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Medicine</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="medicineName" className="block text-lg font-medium">Medicine Name</label>
          <input
            type="text"
            id="medicineName"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="medicinePic" className="block text-lg font-medium">Medicine Picture</label>
          <input
            type="file"
            id="medicinePic"
            onChange={(e) => setMedicinePic(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="noOfTabs" className="block text-lg font-medium">Number of Tablets</label>
          <input
            type="number"
            id="noOfTabs"
            value={noOfTabs}
            onChange={(e) => setNoOfTabs(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expiry" className="block text-lg font-medium">Expiry Date</label>
          <input
            type="date"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Painkiller">Painkiller</option>
            <option value="Antibiotic">Antibiotic</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="dosage" className="block text-lg font-medium">Dosage</label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
}

export default AddMedicine;
