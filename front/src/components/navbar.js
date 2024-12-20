import React from "react";

class Navbar extends React.Component{
    render(){
        return(
            <nav className="navbar">
                <ul className="navbar-items">
                    <li className="navbar-item">
                        <a href="/">My Tasks</a>
                    </li>
                </ul>
                <div className="login-btn">
                    <a href="/auth/sign_in">Log In</a>
                </div>
            </nav>
        )
    }
}

export default Navbar