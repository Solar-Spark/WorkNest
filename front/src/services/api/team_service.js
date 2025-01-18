import axiosInstance from "../../configs/axios_instance"

export const fetchTeams = async () => {
    try {
        const response = await axiosInstance.get(`/teams`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        return [];
    }
}

export const getTeamsByProjectId = async (project_id) => {
    try {
        const response = await axiosInstance.get(`/teams/project/${project_id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting teams:", error);
        return [];
    }
}

export const createTeam = async (team) => {
    try {
        const response = await axiosInstance.post(`/teams`, team);
        switch(response.status){
            case 201:
                return { status: 201 };
            default:
                return {status: response.status, error: response.data.error};
        }
    } catch (error) {
        console.error("Error creating team:", error);
        return {error: "Error creating team"};
    }
}