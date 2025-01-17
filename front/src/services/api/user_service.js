import axiosInstance from "../../configs/axios_instance";

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
        const params = { ids: ids.join(',') };
        const response = await axiosInstance.get(`/users`, { params });
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