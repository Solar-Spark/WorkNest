import React from "react";
import { getTeamsByTeamLeadId } from "../services/api/team_service";
import TeamsList from "../components/main/teams/teams_list";

class MyTeamsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <main>
                <TeamsList
                    ref={this.teamsListRef}
                    fetchTeams={async () => {
                        return await getTeamsByTeamLeadId();
                    }}
                    header="My teams"
                />
            </main>
            
        );
    }
}

export default MyTeamsPage;