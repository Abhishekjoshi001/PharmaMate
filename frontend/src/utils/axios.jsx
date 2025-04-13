import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

// Optional: only show the toast once per session
let sessionToastShown = false;

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 && !sessionToastShown) {
            sessionToastShown = true;
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("auth");
            window.location.href = "/login"; // Force redirect
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
