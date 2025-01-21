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
    async componentDidMount(){
        await this.fetchAndUpdateTeams();
    }
    fetchAndUpdateTeams = async () => {
        const teams = await this.props.fetchTeams();
        this.setState({ teams });
    };
    setAddTeamActive = async (isActive) => {
        await this.fetchAndUpdateTeams();
        this.setState({ addTeamActive: isActive });
    };

    setManageTeamActive = async (isActive, team) => {
        this.setState({ manageTeam: team }, async () => { await this.fetchAndUpdateTeams(); this.setState({ manageTeamActive: isActive });});
    };

    openTeamPage = (team) => {
        sessionStorage.setItem("team_id", JSON.stringify(team.team_id));
        window.location.href = "/team";
    }
    
    render(){
        const { teams, addTeamActive, manageTeamActive, manageTeam } = this.state;
        const { project, addEnabled, isModal } = this.props;
        return(
            <div className="teams-list">
                {project && 
                    <CreateTeamModal
                    isActive={addTeamActive}
                    onClose={async () => await this.setAddTeamActive(false)}
                    project={project}
                />}
                {isModal &&
                    <ManageTeamModal
                        isActive={manageTeamActive}
                        onClose={async () => await this.setManageTeamActive(false)}
                        team={manageTeam}
                    />
                }
                {isModal &&
                <div className="teams-list">
                    <h1>{this.props.header}</h1>
                    <ul className="dynamic-list">
                        {teams.map((item, index) => (
                            <li key={index} className="dynamic-list-item" onClick={() => {if(!isModal) this.openTeamPage(item)}}>
                                <span><h4>{item.name}</h4>
                                <p><b>Lead: </b>{item.lead.username}</p></span> 
                                <div 
                                    className="blue-btn btn"
                                    onClick={async () => await this.setManageTeamActive(true, item)}>
                                    Manage Team
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                }
                {!isModal &&
                <div className="teams-list">
                    <h1>{this.props.header}</h1>
                    <ul className="nav-elements-list">
                        {teams.map((item, index) => (
                            <li key={index} className="nav-elements-list-item" onClick={() => this.openTeamPage(item)}>
                                <span><h4>{item.name}</h4>
                                <p><b>Lead: </b>{item.lead.username}</p></span> 
                            </li>
                        ))}
                    </ul>
                </div>
                }
                {addEnabled && 
                    <button
                        className="blue-btn btn"
                        onClick={async () => await this.setAddTeamActive(true)}
                    >
                        Add Team
                    </button>
                }
            </div>
        );
    }
}

export default TeamsList;