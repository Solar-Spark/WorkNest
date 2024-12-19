import React from "react";

class Navbar extends React.Component{
    render(){
        return(
            <nav className="navbar">
                <ul className="navbar-items">
                    <li>
                        <a href="/">My Tasks</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar