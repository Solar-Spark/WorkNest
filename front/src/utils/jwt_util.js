import { jwtDecode } from 'jwt-decode';

export function getTokenData(token){
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Token decoding error:", error);
        return null;
    }
}