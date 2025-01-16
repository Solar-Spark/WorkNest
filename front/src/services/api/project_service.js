import axiosInstance from "../../configs/axios_instance"

export const fetchProjects = async () => {
    try {
        const response = await axiosInstance.get(`/projects`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}
export const getProjectById = async (project_id) => {
    try {
        const response = await axiosInstance.get(`/projects/${project_id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting project:", error);
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
        console.error("Error creating project:", error);
        return {error: "Error creating project"};
    }
}