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
        return response.data;
    } catch (error) {
        return [];
    }
}
export const getUsersByTeamId = async (team_id) => {
    try {
        const response = await axiosInstance.get(`users/team/${team_id}`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const searchUserByUsername = async (prompt) => {
    try {
        const response = await axiosInstance.post(`users/search`, { prompt });
        return response.data;
    } catch (error) {
        return [];
    }
}

export const updateUserData = async (user_id) => {
    try {
        const response = await axiosInstance.get(`/users/${user_id}`);
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
    }
}