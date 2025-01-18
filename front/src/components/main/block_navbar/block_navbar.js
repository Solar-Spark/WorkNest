import React from "react";
import BlockNavbarItem from "./block_navbar_item";

class BlockNavbar extends React.Component {
    setStage = (stage) => {
        this.props.setStage(stage);
    }
    render() {
        return (
            <nav className="block-navbar">
                <ul className="block-navbar-items">
                    <BlockNavbarItem setStage={() => this.setStage("tasks")} title="Project Tasks" />
                    <BlockNavbarItem setStage={() => this.setStage("teams")} title="Project Teams" />
                    <BlockNavbarItem setStage={() => this.setStage("info")} title="Project Info" />
                </ul>
            </nav>
        );
    }
}

export default BlockNavbar;
