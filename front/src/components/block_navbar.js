import React from "react";

class BlockNavbar extends React.Component{
    render(){
        return(
            <div className="block-navbar">
                <ul className="block-navbar-items">
                    <li className="block-navbar-item selected">
                        To Do
                    </li>
                    <li className="block-navbar-item">
                        In Progress
                    </li>
                    <li className="block-navbar-item">
                        Finished
                    </li>
                </ul>
                <hr></hr>
            </div>
        )
    }
}

export default BlockNavbar