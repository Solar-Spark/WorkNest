import axiosInstance from "../../configs/axios_instance";

export const getUserInfoById = async (user_id) => {
    try{
        const response = await axiosInstance.get(`/users/${user_id}`);
        switch(response.status){
            case 200:
                return { status: response.status, user: response.data };
            default:
                return { status: response.status, error: response.data.error };
        }
    } catch(err){
        return { error: "Error getting user info" }
    }
}