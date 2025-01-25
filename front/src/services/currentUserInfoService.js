export const getUserInfo = () => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    } catch(err){
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
    }
}

export const hasProjectManagerRole = (project_id) => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            return user.roles.some(role => role.name === "PROJECT_MANAGER" && role.project_id === project_id);
        }
        else{
            return setTimeout(hasProjectManagerRole(project_id), 1000)
        }
    } catch(err){
    }
}

export const hasTeamLeadRole = (team_id) => {
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user.roles){
            return user.roles.some(role => role.name === "TEAM_LEAD" && role.team_id === team_id);
        }
        else{
            return setTimeout(hasTeamLeadRole(team_id), 1000)
        }
    } catch(err){
    }
}