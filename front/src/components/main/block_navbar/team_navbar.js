import React from "react";
import BlockNavbarItem from "./block_navbar_item";

class TeamNavbar extends React.Component {
    setStage = (stage) => {
        this.props.setStage(stage);
    }
    render() {
        return (
            <nav className="block-navbar">
                <ul className="block-navbar-items">
                    <BlockNavbarItem setStage={() => this.setStage("tasks")} title="Team Tasks" />
                    <BlockNavbarItem setStage={() => this.setStage("info")} title="Team Info" />
                </ul>
            </nav>
        );
    }
}

export default TeamNavbar;
