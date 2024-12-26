import React from "react";
import axiosInstance from "../configs/axios_instance";
import { useNavigate } from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData : {
                username : "",
                email : "",
                password : ""
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
                    [name]: value,
                },
            }));
        }
    };

    validateForm(){
        for(const key in this.state.formData){
            if(this.state.formData[key] === ""){
                this.setState({errorText : "Enter all fields"});
                return false;
            }
        }
        if(this.state.formData.password !== this.state.confirmPassword){
            console.log(this.state.confirmPassword)
            this.setState({errorText : "Password doesn't match with confirm password"});
            return false;
        }

        return true;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.validateForm()){
            try {
                console.log("Form validated")
                const response = await axiosInstance.post("/auth/sign_up", this.state.formData);
                switch(response.status){
                    
                    case 201:
                        console.log("Data sended")
                        this.props.navigate("/");
                        break;

                    default:
                        this.setState({errorText : "Unknown error"})
                        break;
                }
            } catch (error) {
                switch(error.response.status){
                    case 409:
                        this.setState({errorText : "Username or email is busy"});
                        break;
                    case 500:
                        this.setState({errorText : "Internal server error"})
                        break;
                    default:
                        console.error("Data send error: ", error);
                }
            }
        }
    };
    
    render(){
        return(
            <div className="sign-up auth-form">
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
                    <a href="/auth/sign_in">Already have account?</a>
            </div>
        )
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <SignUp {...props} navigate={navigate} />;
}

export default WithNavigate;