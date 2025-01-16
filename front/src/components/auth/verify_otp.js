import React from "react";
import { verifyOTP } from "../../services/api/auth_service";
class VerifyOTP extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            otp: "",
            errorText : "",
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const result = await verifyOTP(this.state.otp, this.props.data.username);
        if(result.status === 200){
            window.location.href = '/tasks';
        }
        else{
            this.setState({errorText: result.error})
        }
    };
    
    render(){
        return(
            <div className="otp auth-form">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field input-text-field">
                        <label>Code from SMS</label><br></br>
                        <input type="text" name="otp" value={this.state.otp} onChange={this.handleChange}></input><br></br>
                    </div>
                        <input type="submit" value="Verify code" className="submit-btn"></input>
                </form>
                <p className="form-err-text">{this.state.errorText}</p>
            </div>
        )
    }
}

export default VerifyOTP;