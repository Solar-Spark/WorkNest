import React from "react";

class Register extends React.Component{
    render(){
        return(
            <div className="sign-up auth-form">
                <h1>Sign Up</h1>
                <form action="/reg" method="POST" className="reg-form">
                    <div className="input-text-field">
                        <label>Username</label><br></br>
                        <input type="text"></input><br></br>
                    </div>
                    <div className="input-text-field">
                        <label>Email</label><br></br>
                        <input type="email"></input><br></br>
                    </div>
                    <div className="input-text-field">
                        <label>Password</label><br></br>
                        <input type="password"></input><br></br>
                    </div>
                    <div className="input-text-field">
                        <label>Confirm Password</label><br></br>
                        <input type="password"></input><br></br>
                    </div>
                        <input type="submit" value="Sign Up" className="submit-btn"></input>
                    </form>
            </div>
        )
    }
}

export default Register