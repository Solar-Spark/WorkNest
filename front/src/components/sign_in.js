import React from "react";
import axiosInstance from "../configs/axios_instance";
import { useNavigate } from 'react-router-dom';

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData : {
                username : "",
                password : ""
            },
            errorText : ""
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
        
        if(this.validateForm()){
            try {
                const response = await axiosInstance.post("/auth/sign_in", this.state.formData);
                switch(response.status){
                    
                    case 200:
                        console.log("Data sended")
                        this.props.navigate("/");
                        break;

                    case 400:
                        this.setState({errorText : "Invalid login or password"});
                        break;

                    default:
                        this.setState({errorText : "Unknown error"})
                        break;
                }
            } catch (error) {
                console.error("Data send error: ", error);
            }
        }
    };
    render(){
        return(
            <div className="sign-in auth-form">
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
                    <a href="/auth/sign_up">Haven't account?</a>
            </div>
        )
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <SignIn {...props} navigate={navigate} />;
}

export default WithNavigate;