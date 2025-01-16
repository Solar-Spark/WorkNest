import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const refreshAuthToken = async () => {
    try {
        const response = await axiosInstance.post("auth/refresh", {});

        const authToken = response.data.auth;

        localStorage.setItem('authToken', authToken);

        return authToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
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
                    console.log(errorCode);
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
        }
        else if(error.response?.status === 400){
            const errorCode = error.response?.data?.error;
            
            if (errorCode === 'invalid_refresh') {
                window.location.href = '/auth';
            }
        }
        else if(error.response?.status === 403){
            const errorCode = error.response?.data?.error;
            
            if (errorCode === 'auth_required') {
                window.location.href = '/auth';
            }
        }
        else if (error.response?.status >= 500) {
            window.location.href = '/server-error';
        }
        if (error.code === 'ECONNABORTED') {
            alert("Server doesn't response. Check your connection and retry");
        } else if (!error.response) {
            alert("Can't connect to the server. Check your internet connection");
        }
    }
);

export default axiosInstance;