import React from "react";
import NavbarItem from "./navbar_item";
import { logOut } from "../../../services/api/auth_service";
import { getUsername } from "../../../services/currentUserInfoService";
import ProjectsList from "../../main/projects/projects_list";
import TeamsList from "../../main/teams/teams_list";
import { getTeamsByTeamLeadId } from "../../../services/api/team_service";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("authToken"),
            username: getUsername(),
        };
    }

    handleLogout = async () => {
        await logOut();
        this.setState({ token: null });
        window.location.href = "/auth";
    };
    handleLogin = () => {
        window.location.href = "/auth";
    };
    render() {
        const username = this.state.username;
        return (
            <nav className="navbar">
                <ul className="navbar-items">
                    <NavbarItem link="/tasks" title="My Tasks" />
                    <NavbarItem link="/projects" isComplex={true} title="My Projects" complexContent={<ProjectsList/>} />
                    <NavbarItem link="/teams" isComplex={true} title="My Teams" complexContent={<TeamsList fetchTeams = {
                                                                                                    async () => {
                                                                                                        return await getTeamsByTeamLeadId();
                                                                                                        }}/>
                                                                                                    }
                                                                                                    isModal={false}
                                                                                                />
                </ul>
                <p className="nav-username">{username}</p>
                {this.state.token !== null ? (
                    <button className="blue-btn btn" onClick={async () => { await this.handleLogout() }}>Log Out</button>
                ) : (
                    <button className="blue-btn btn" onClick={this.handleLogin}>Log In</button>
                )}
            </nav>
        );
    }
}

export default Navbar;
