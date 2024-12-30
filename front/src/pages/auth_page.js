import React from "react";
import SignUp from "../components/sign_up";
import SignIn from "../components/sign_in";

class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            component : null,
        }
        
    }
    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.component !== nextState.component) {
            let newComponent = null;
            if (nextProps.component === "sign_in") {
                newComponent = <SignIn/>;
            } else if (nextProps.component === "sign_up") {
                newComponent = <SignUp />;
            }
            return {
                component: newComponent,
            };
        }
        return null;
    }
    render(){
        return(
            <div className="auth">
                <h1>{this.props.title}</h1>
                {this.state.component}
            </div>
        )
    }
}

export default Auth