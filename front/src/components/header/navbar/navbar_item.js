import React from "react";
import NavbarOpenedItem from "./navbar_opened_item";
import ProjectsList from "../../main/projects/projects_list";

class NavbarItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpened: false,
        }
    }
    setOpened(isOpened){
        this.setState({isOpened});
    }
    render(){
        return(
            <li className="navbar-item">
                {this.props.isComplex && <p onClick={() => this.setOpened(!this.state.isOpened)}>{this.props.title}</p>}
                {!this.props.isComplex && <a href={this.props.link}>{this.props.title}</a>}
                {this.state.isOpened && this.props.isComplex && <NavbarOpenedItem content={<ProjectsList/>}/>}
            </li>
        );
    }
}

export default NavbarItem;