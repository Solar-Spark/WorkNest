import axiosInstance from "../../configs/axios_instance"
import { getTokenData, saveAuthToken, removeAuthToken } from "../../utils/jwt_util"
import { updateUserData } from "./user_service";

export const signIn = async (formData) => {
    try {
      const response = await axiosInstance.post(`/auth/sign_in`, {
        username: formData.username,
        password: formData.password,
      });
  
      if (response.status === 200) {
        return { status: 200 };
      }
  
      return { error: "Log in error, try later" };
    } catch (error) {
  
      if (error.response && error.response.status) {
        const { status } = error.response;
  
        if (status === 401) {
          return { status: 401, error: "Invalid login or password" };
        }
  
        if (status === 404) {
          return { status: 404, error: "User not found" };
        }
  
        return { error: "Log in error, try later" };
      }
  
      if (error.request) {
        return { error: "No response from server. Please check your connection." };
      }
  
      return { error: "An unexpected error occurred. Please try again." };
    }
  };
  
  
export const signUp = async (formData) => {
    try {
        const response = await axiosInstance.post("/auth/sign_up", formData);
        switch (response.status) {
            case 201:
                return { status: response.status };

            default:
                return { error: "Unknown error" };
        }
    } catch (error) {
        if (error.response) {
            switch (error.response?.status) {
                case 409:
                    return { status: error.response.status, error: "Username or email is busy" };
                case 500:
                    return { status: error.response.status, error: "Internal server error" };
                default:
                    return { status: error.response.status, error: "Internal server error" };
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
        await logIn(response.data.auth);
        return { status: 200 };
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return { status: error.response.status, error: "Invalid code" };
                default:
                    return { status: error.response.status, error: "Invalid login or password" };
            }
        }
        return [];
    }
}
export const logOut = async () => {
    try{
        await axiosInstance.delete('auth/logout');
        localStorage.removeItem("user");
        removeAuthToken();
    }
    catch(error){
    }
}
export const logIn = async (authToken) => {
    try {
        saveAuthToken(authToken);
        updateUserData(getTokenData(authToken).data.user_id);
    } catch (error) {
    }
}