import React from "react";
import SignUp from "../components/sign_up";
import SignIn from "../components/sign_in";

class Auth extends React.Component{
    constructor(props) {
        super(props);
        if(this.props.state === "sign_in"){
            this.state = <SignIn />;
        }
        else if(this.props.state === "sign_up"){
            this.state = <SignUp />;
        }
    }
    render(){
        return(
            <div className="auth">
                <h1>{this.props.title}</h1>
                {this.state}
            </div>
        )
    }
}

export default Auth