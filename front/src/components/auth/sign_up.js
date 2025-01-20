import React from "react";
import { useNavigate } from 'react-router-dom';
import { signUp } from "../../services/api/auth_service";

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData : {
                username : "",
                email : "",
                password : "",
                phone_number : ""
            },
            confirmPassword : "",
            errorText : ""
        };
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            this.setState({ confirmPassword: value });
        }
        else{
            this.setState((prevState) => ({
                formData: {
                    ...prevState.formData,
                    [name]: value.trim(),
                },
            }));
        }
    };

    validateForm(){
        const {username, phone_number, password } = this.state.formData;
        if(Object.values(this.state.formData).some(value => value === null || value === undefined || value === "")){
            this.setState({errorText : "Enter all fields"});
            return false;
        }
        if(password !== this.state.confirmPassword){
            this.setState({errorText : "Password doesn't match with confirm password"});
            return false;
        }
        
        if (username === '') {
            this.setState({errorText : "Username cannot be empty"});
            return false
        }
    
        const phoneRegex = /^\+\d+$/;
        if (!phoneRegex.test(phone_number)) {
            this.setState({errorText : 'Phone number must start with "+" and contain only digits.'});
            return false
        } 
        else if (phone_number.length < 10) {
            this.setState({errorText : "Phone number must be at least 10 digits long."});
            return false
        }
    
        if (password.length < 6) {
            this.setState({errorText : "Password must be at least 6 characters long."});
            return false
        } 
        else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            this.setState({errorText : "Password must contain both letters and numbers."});
            return false
        }
        this.setState({errorText: ""});
        return true;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.validateForm()){
            const signUpResult = await signUp(this.state.formData);
            if (signUpResult && signUpResult.status){
                switch(signUpResult.status){
                    case 201:
                        this.props.onStepChange('signIn');
                        break;
                    case 409:
                        this.setState({errorText: signUpResult.error})
                        break;
                    default:
                        break;
                }
            }
        }
    };
    
    render(){
        return(
            <div className="sign-up auth-form">
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field input-text-field">
                        <label>Username</label><br></br>
                        <input type="text" name="username" value={this.state.formData.username} onChange={this.handleChange}></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Email</label><br></br>
                        <input type="email" name="email" value={this.state.formData.email} onChange={this.handleChange}></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Phone Number</label><br></br>
                        <input type="tel" name="phone_number" value={this.state.formData.phone_number} onChange={this.handleChange}></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Password</label><br></br>
                        <input type="password" name="password" value={this.state.formData.password} onChange={this.handleChange}></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Confirm Password</label><br></br>
                        <input type="password" name="confirmPassword" value={this.state.password} onChange={this.handleChange}></input><br></br>
                    </div>
                        <input type="submit" value="Sign Up" className="submit-btn"></input>
                    </form>
                    <p className="form-err-text">{this.state.errorText}</p>
                    <p onClick={() => this.props.onStepChange('signIn')}>Already have account?</p>
            </div>
        )
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <SignUp {...props} navigate={navigate} />;
}

export default WithNavigate;