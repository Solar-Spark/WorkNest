import React from "react";

class NavbarOpenedItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div className="navbar-opened-item">
                {this.props.content}
            </div>
        );
    }
}

export default NavbarOpenedItem;