import axiosInstance from "../../configs/axios_instance"

export const fetchProjects = async () => {
    try {
        const response = await axiosInstance.get(`/projects`);
        return response.data;
    } catch (error) {
        return [];
    }
}
export const getProjectById = async (project_id) => {
    try {
        const response = await axiosInstance.get(`/projects/${project_id}`);
        return response.data;
    } catch (error) {
        return [];
    }
}
export const createProject = async(formData) => {
    try {
        const response = await axiosInstance.post(`/projects`, formData);
        switch(response.status){
            case 201:
                return { status: 201 };
            default:
                return {status: response.status, error: response.data.error};
        }
    } catch (error) {
        return {error: "Error creating project"};
    }
}
export const deleteProjectById = async(project_id) => {
    try {
        await axiosInstance.delete(`/projects/${project_id}`);
    } catch (error) {
    }
}
export const getProjectStatisticsById = async (project_id) => {
    try {
        const response = await axiosInstance.get(`/projects/${project_id}/statistics`);
        return response.data;
    } catch (error) {
        return null;
    }
}