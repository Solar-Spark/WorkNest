import axiosInstance from "../../configs/axios_instance"

export const fetchUserTasks = async () => {
    try {
        const response = await axiosInstance.get(`/tasks`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}
export const fetchProjectTasks = async (project_id) => {
    try {
        if (!project_id) {
            console.error("Error: project_id is required");
            return [];
        }
        console.log(project_id);
        const response = await axiosInstance.get(`/tasks/project/${project_id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}
export const createTask = async (formData) => {
    try {
        const response = await axiosInstance.post(`/tasks`, formData);
        switch(response.status){
            case 201:
                return { status: 201 };
            default:
                return {status: response.status, error: response.data.error};
        }
    } catch (error) {
        console.error("Error creating task:", error);
        return {error: "Error creating task"};
    }
}