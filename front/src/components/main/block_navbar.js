import React from "react";

class BlockNavbar extends React.Component{
    render(){
        return(
            <div className="block-navbar">
                <ul className="block-navbar-items">
                    <li className="block-navbar-item selected" onClick={this.props.onClickFun(1)}>
                        To Do
                    </li>
                    <li className="block-navbar-item" onClick={() => this.props.onClickFun(2)}>
                        In Progress
                    </li>
                    <li className="block-navbar-item" onClick={this.props.onClickFun(3)}>
                        Finished
                    </li>
                </ul>
                <hr></hr>
            </div>
        )
    }
}

export default BlockNavbar