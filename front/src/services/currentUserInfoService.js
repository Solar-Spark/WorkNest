export const getUserInfo = () => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    } catch(err){
        console.error(err)
        setTimeout(getUserInfo(), 1000)
    }
}

export const getUsername = () => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user){
            return null;
        }
        return user.username;
    } catch(err){
        console.error(err)
        setTimeout(getUsername(), 1000)
    }
}

export const hasProjectManagerRole = (project_id) => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        return user.roles.some(role => role.name === "PROJECT_MANAGER" && role.project_id === project_id);
    } catch(err){
        console.error(err)
        setTimeout(hasProjectManagerRole(project_id), 1000)
    }
}

export const hasTeamLeadRole = (team_id) => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        return user.roles.some(role => role.name === "TEAM_LEAD" && role.team_id === team_id);
    } catch(err){
        console.error(err)
        setTimeout(hasTeamLeadRole(team_id), 1000)
    }
}