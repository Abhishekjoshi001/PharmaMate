import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Inventory = () => {
    const [medicines, setMedicines] = useState([]); // State to store medicines
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const auth = JSON.parse(localStorage.getItem("auth")); // Retrieve stored auth data
                const token = auth?.token;

                if (!token) {
                    console.error("No token found. Redirecting to login.");
                    alert("Session expired. Please log in again.");
                    localStorage.removeItem("auth");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:8000/api/medicine/", { // No trailing slash in URL
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
                    },
                    withCredentials: true, // ✅ Ensures cookies are sent if needed
                });

                console.log("Fetched medicines:", response.data);
                setMedicines(response.data); // ✅ Store medicines in state
            } catch (error) {
                console.error("Error fetching medicines:", error);

                if (error.response?.status === 401) {
                    alert("Session expired. Please log in again.");
                    localStorage.removeItem("auth");
                    navigate("/login");
                }
            }
        };

        fetchMedicine();
    }, [navigate]); // ✅ Dependency array ensures execution only when navigating

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Medicine Inventory</h2>
            <div className="flex flex-wrap gap-5">
                {medicines.length > 0 ? (
                    medicines.map((med) => (
                        <div 
                            key={med._id} 
                            className="border border-gray-300 p-4 rounded-lg w-48 text-center shadow-md"
                        >
                            <img 
                                src={med.medicinePic || "https://via.placeholder.com/150"} 
                                alt={med.medicineName} 
                                className="w-full rounded-lg mb-2" 
                            />
                            <h3 className="font-semibold text-lg">{med.medicineName}</h3>
                            <p className="text-sm mb-1">Tablets: {med.noOfTabs}</p>
                            <p className="text-sm mb-1">Expiry: {new Date(med.expiry).toLocaleDateString()}</p>
                            <p className="text-sm mb-1">Category: {med.category}</p>
                            <p className="text-sm mb-1">Dosage: {med.dosage}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No medicines found.</p>
                )}
            </div>
        </div>
    );
};

export default Inventory;
