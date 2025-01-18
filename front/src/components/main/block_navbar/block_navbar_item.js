import React from "react";

class BlockNavbarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <li className="block-navbar-item" onClick={this.props.setStage}>
                {this.props.title}
            </li>
        );
    }
}

export default BlockNavbarItem;