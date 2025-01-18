import React from "react";
import {getTeamsByProjectId } from "../../../services/api/team_service";
import CreateTeamModal from "./create_team_modal";
import ManageTeamModal from "./manage_team_modal";
class TeamsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            teams: [],
            addTeamActive: false,
            manageTeamActive: false,
            manageTeam: null,
        }
    }
    async componentDidMount() {
        if(this.props.project.project_id){
            this.setState({teams: await getTeamsByProjectId(this.props.project.project_id)});
        }
    }
    fetchAndUpdateTeams = async () => {
        const teams = await this.props.fetchTeams();
        this.setState({ teams });
    };
    setCreateProjectActive = async (isActive) => {
        if(this.props.project.project_id){
            this.setState({teams: await getTeamsByProjectId(this.props.project.project_id)});
        }
        this.setState({ createTeamActive: isActive });
    };
    setAddTeamActive = async (isActive) => {
        await this.fetchAndUpdateTeams();
        this.setState({ addTeamActive: isActive });
    };

    setManageTeamActive = async (isActive, team) => {
        console.log(team);
        this.setState({ manageTeam: team }, async () => { await this.fetchAndUpdateTeams(); this.setState({ manageTeamActive: isActive });});
    };
    
    render(){
        const { teams, addTeamActive, manageTeamActive, manageTeam } = this.state;
        const { project } = this.props;
        
        return(
            <div className="teams-list">
                <CreateTeamModal
                    isActive={addTeamActive}
                    onClose={async () => await this.setAddTeamActive(false)}
                    project={project}
                />
                <ManageTeamModal
                    isActive={manageTeamActive}
                    onClose={async () => await this.setManageTeamActive(false)}
                    team={manageTeam}
                />
                <h1>{this.props.header}</h1>
                <ul className="dynamic-list">
                    {teams.map((item, index) => (
                        <li key={index} className="dynamic-list-item">
                            <span><h4>{item.name}</h4>
                            <p><b>Lead: </b>{item.lead.username}</p></span>
                            <div 
                                className="blue-btn btn"
                                onClick={async () => await this.setManageTeamActive(true, item)}>
                                Manage Team</div>
                        </li>
                    ))}
                </ul>
                <button
                    className="blue-btn btn"
                    onClick={async () => await this.setAddTeamActive(true)}
                >
                    Add Team
                </button>
            </div>
        );
    }
}

export default TeamsList;