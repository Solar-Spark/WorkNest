import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
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
        if (error.response && error.response.status === 401) {
            window.location.href = '/auth/sign_in';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;