import React from "react";
import NavbarItem from "./navbar_item";
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("authToken"),
        };
    }

    handleLogout = () => {
        localStorage.removeItem("authToken");
        this.setState({ token: null });
        window.location.href = "/auth";
    };
    handleLogin = () => {
        window.location.href = "/auth";
    };
    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-items">
                    <NavbarItem link="/tasks" title="My Tasks"/>
                    <NavbarItem link="/projects" isComplex={true} title="My Projects"/>
                </ul>
                {this.state.token !== null ? (
                    <button className="logout-btn btn" onClick={this.handleLogout}>Log Out</button>
                ) : (
                    <button className="login-btn btn" onClick={this.handleLogin}>Log In</button>
                )}
            </nav>
        );
    }
}

export default Navbar;
