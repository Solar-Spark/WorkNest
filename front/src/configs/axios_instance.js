import axios from 'axios';
import { logIn } from '../services/api/auth_service';

const axiosInstance = axios.create({
  baseURL: 'http://37.151.225.71:5000/api',
  withCredentials: true,
});

const refreshAuthToken = async () => {
    try {
        const response = await axiosInstance.post("auth/refresh", {});
        const authToken = response.data.auth;
        
        await logIn(authToken);
        
        return authToken;
    } catch (error) {
        throw error;
    }
};

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            const errorCode = error.response?.data?.error;
            if (errorCode === "token_expired") {
                originalRequest._retry = true;
                try {
                    const newToken = await refreshAuthToken();
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('authToken');
                    window.location.href = '/auth';
                    return Promise.reject(refreshError);
                }
            }
            else if(errorCode === "refresh_expired"){
                window.location.href = '/auth';
            }
            else if(errorCode === "refresh_token_needed"){
                window.location.href = '/auth';
            }
            return Promise.reject(error);
        }
        else if(error.response?.status === 400){
            const errorCode = error.response?.data?.error;
            
            if (errorCode === 'invalid_refresh') {
                window.location.href = '/auth';
            }
            return Promise.reject(error);
        }
        else if(error.response?.status === 403){
            const errorCode = error.response?.data?.error;
            
            if (errorCode === 'auth_required') {
                window.location.href = '/auth';
            }
            return Promise.reject(error);
        }
        else if (error.response?.status >= 500) {
            const errorData = {
                status: error.response?.status,
                message: `Internal Server Error ${error.response?.status}`,
                data: "Internal Server Error Occured. Try to connect later",
            };
            if(error.response?.status === 503){
                errorData.data = "Database Isn't Avaliable"
            }
            window.location.href = `/server-error?errorData=${encodeURIComponent(JSON.stringify(errorData))}`;
        }
        if (error.code === 'ECONNABORTED') {
            alert("Server doesn't response. Check your connection and retry");
        } else if (!error.response) {
            const errorData = {
                status: null,
                message: "Server Connection Error",
                data: "Couldn't connect to the server",
            };
            window.location.href = `/server-error?errorData=${encodeURIComponent(JSON.stringify(errorData))}`;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;