import React from "react";
import BlockNavbar from "./block_navbar";

class MainBlock extends React.Component{
    render(){
    return(
        <main>
            <div className="main-title">
                <h2>
                    {this.props.title}
                </h2>
            </div>
            <BlockNavbar />
        </main>
        )
    }
}

export default MainBlock