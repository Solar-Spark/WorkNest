import { jwtDecode } from 'jwt-decode';

export const getTokenData = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Token decoding error:", error);
        return null;
    }
}
export const saveAuthToken = (token) => {
    localStorage.setItem("authToken", token);
}
export const removeAuthToken = () => {
    localStorage.removeItem("authToken");
}