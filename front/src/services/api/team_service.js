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

export const getTeamById = async (team_id) => {
    try {
        const response = await axiosInstance.get(`/teams/${team_id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        return null;
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

export const getTeamsByTeamLeadId = async () => {
    try {
        const response = await axiosInstance.get(`/teams`);
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

export const updateTeam = async (team) => {
    try {
        const response = await axiosInstance.put(`/teams/${team.team_id}`, team);
        switch(response.status){
            case 200:
                return { status: 200 };
            default:
                return {status: response.status, error: response.data.error};
        }
    } catch (error) {
        console.error("Error updating team:", error);
        return {error: "Error updating team"};
    }
}

export const deleteTeamById = async (team_id) => {
    try {
        const response = await axiosInstance.delete(`/teams/${team_id}`);
        switch(response.status){
            case 200:
                return { status: 200 };
            default:
                return {status: response.status, error: response.data.error};
        }
    } catch (error) {
        console.error("Error deleting team:", error);
        return {error: "Error deleting team"};
    }
}
export const getTeamStatisticsById = async (team_id) => {
    try {
        const response = await axiosInstance.get(`/teams/${team_id}/statistics`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting team statistics:", error);
        return null;
    }
}