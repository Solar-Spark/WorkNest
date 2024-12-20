import React from "react";
import Register from "./register";

class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = <Register />;
    }
    render(){
        return(
            <div className="auth">
                {this.state}
            </div>
        )
    }
}

export default Auth