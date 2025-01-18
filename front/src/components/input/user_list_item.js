import React from "react";

class UserListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="list-item user-list-item">
                {this.props.name}
            </div>
        );
    }
}
export default UserListItem;