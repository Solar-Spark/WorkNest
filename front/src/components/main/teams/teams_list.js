import React from "react";
import {getTeamsByProjectId } from "../../../services/api/team_service";

class TeamsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            teams: [],
            createTeamActive: false,
        }
    }
    async componentDidMount() {
        if(this.props.project_id){
            this.setState({teams: await getTeamsByProjectId(this.props.project_id)});
        }
    }
    fetchAndUpdateTeams = async () => {
        const teams = await this.props.fetchTeams();
        this.setState({ teams });
    };
    setCreateProjectActive = async (isActive) => {
        if(this.props.project_id){
            this.setState({teams: await getTeamsByProjectId(this.props.project_id)});
        }
        this.setState({ createTeamActive: isActive });
    };
    render(){
        const { teams } = this.state;
        return(
            <div className="teams-list">
                <h1>{this.props.header}</h1>
                <ul className="elements-list">
                    {teams.map((item, index) => (
                        <li key={index} className="elements-list-item">
                            <h4>{item.name}</h4>
                            <p><b>Lead: </b>{item.lead.username}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TeamsList;