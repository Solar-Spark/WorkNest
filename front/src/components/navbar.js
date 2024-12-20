import React from "react";

class Navbar extends React.Component{
    render(){
        return(
            <nav className="navbar">
                <ul className="navbar-items">
                    <li className="navbar-item">
                        <a href="/">My Tasks</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/auth">Log In</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar