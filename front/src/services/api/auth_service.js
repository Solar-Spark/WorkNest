import axiosInstance from "../../configs/axios_instance"
import { saveAuthToken } from "../../utils/jwt_util"

export const signIn = async (formData) => {
    try {
        await axiosInstance.post(`/auth/sign_in`, { username: formData.username, password: formData.password });
        return { status: 200 };
    } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response){
            switch (error.response.status) {
                case 404:
                    return { status: error.response.status, error: "User not found" };

                case 401:
                    return { status: error.response.status, error: "Invalid login or password" };
        
                default:
                    console.error("Data send error: ", error);
                    return { status: error.response.status, error: "Invalid login or password" }
            }
        }
        return [];
    }
}
export const signUp = async (formData) => {
    try {
        const response = await axiosInstance.post("/auth/sign_up", formData);
        switch(response.status){
            case 201:
                return { status: response.status };

            default:
                return {error: "Unknown error"};
        }
    } catch (error) {
        console.error("Error during sign-up: ", error);
        if (error.response) {
            switch(error.response?.status){
                case 409:
                    return { status: error.response.status, error: "Username or email is busy" };
                case 500:
                    return { status: error.response.status, error: "Internal server error"};
                default:
                    console.error("Data send error: ", error);
                    return { status: error.response.status, error: "Internal server error"};
            }
        }
        else if (error.request) {
            return { error: "Unable to connect to the server. Please try again later." };
        } else {
            return { error: "An error occurred. Please try again later." };
        }
    }
}
export const verifyOTP = async (otp, username) => {
    try {
        const response = await axiosInstance.post(`/auth/verify-otp`, { username: username, otp: otp });
        saveAuthToken(response.data.auth);
        console.log(response);
        return { status: 200 };
    } catch (error) {
        console.error("Verifying OTP:", error);
        if (error.response){
            switch (error.response.status) {
                case 401:
                    return { status: error.response.status, error: "Invalid code" };        
                default:
                    console.error("Data send error: ", error);
                    return { status: error.response.status, error: "Invalid login or password" };
            }
        }
        return [];
    }
}