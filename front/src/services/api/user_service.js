import axiosInstance from "../../configs/axios_instance";
import { getTokenData } from "../../utils/jwt_util";

export const getUserInfoById = async (user_id) => {
    try {
        const response = await axiosInstance.get(`/users/${user_id}`);
        switch (response.status) {
            case 200:
                return { status: response.status, user: response.data };
            default:
                return { status: response.status, error: response.data.error };
        }
    } catch (err) {
        return { error: "Error getting user info" }
    }
}

export const getUsersByIds = async (ids) => {
    try {
        const response = await axiosInstance.post(`/users/ids`, { ids });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
export const getUsersByTeamId = async (team_id) => {
    try {
        const response = await axiosInstance.get(`users/team/${team_id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting team members:", error);
        return [];
    }
}

export const searchUserByUsername = async (prompt) => {
    try {
        const response = await axiosInstance.post(`users/search`, { prompt });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting team members:", error);
        return [];
    }
}

export const updateUserData = async (user_id) => {
    try {
        const response = await axiosInstance.get(`/users/${ user_id }`);
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}