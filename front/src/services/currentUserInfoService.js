export const getUserInfo = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}

export const getUsername = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user){
        return null;
    }
    return user.username;
}

export const hasProjectManagerRole = (project_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.roles.some(role => role.name === "PROJECT_MANAGER" && role.project_id === project_id);
}

export const hasTeamLeadRole = (team_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.roles.some(role => role.name === "TEAM_LEAD" && role.team_id === team_id);
}