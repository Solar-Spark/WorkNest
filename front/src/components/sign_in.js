import React from "react";
import { signIn } from "../services/api/auth_service";

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData : {
                username : "",
                password : "",
            },
            errorText : "",
        };
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    validateForm(){
        if(this.state.formData.password === "" && this.state.formData.username === ""){
            this.setState({errorText : "Enter username and password"});
            return false;
        }
        else if(this.state.formData.password === ""){
            this.setState({errorText : "Enter the password"});
            return false;
        } 
        else if(this.state.formData.username === ""){
            this.setState({errorText : "Enter the username"});
            return false;
        }
        return true;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
    
        if (this.validateForm()) {
            const signInResult = await signIn(this.state.formData);
            switch(signInResult.status){
                case 200:
                    this.props.onStepChange('verifyOtp', {username: this.state.formData.username});
                    break;
                default:
                    break;
            }
        }
    };
    render(){
        return(
            <div className="sign-in auth-form">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field input-text-field">
                        <label>Username</label><br></br>
                        <input type="text" name="username" value={this.state.formData.username} onChange={this.handleChange}></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Password</label><br></br>
                        <input type="password" name="password" value={this.state.formData.password} onChange={this.handleChange}></input><br></br>
                    </div>
                        <input type="submit" value="Sign In" className="submit-btn"></input>
                </form>
                <p className="form-err-text">{this.state.errorText}</p>
                <p onClick={() => this.props.onStepChange('signUp')}>Haven't account?</p>
            </div>
        )
    }
}

export default SignIn;