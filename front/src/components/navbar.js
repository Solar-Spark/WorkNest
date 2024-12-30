import React from "react";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: sessionStorage.getItem("user_id"),
        };
    }

    handleLogout = () => {
        sessionStorage.removeItem("user_id");
        this.setState({ userId: null });
        window.location.href = "/auth/sign_in";
    };
    handleLogin = () => {
        window.location.href = "/auth/sign_in";
    };
    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-items">
                    <li className="navbar-item">
                        <a href="/tasks">My Tasks</a>
                    </li>
                </ul>
                {this.state.userId !== null ? (
                    <button className="logout-btn btn" onClick={this.handleLogout}>Log Out</button>
                ) : (
                    <button className="login-btn btn" onClick={this.handleLogin}>Log In</button>
                )}
            </nav>
        );
    }
}

export default Navbar;
