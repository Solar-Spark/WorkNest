import React from "react";

class SignUp extends React.Component{
    render(){
        return(
            <div className="sign-up auth-form">
                <form action="/api/auth/sign_up" method="POST" className="reg-form">
                    <div className="input-field input-text-field">
                        <label>Username</label><br></br>
                        <input type="text" name="username"></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Email</label><br></br>
                        <input type="email" name="email"></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Password</label><br></br>
                        <input type="password" name="password"></input><br></br>
                    </div>
                    <div className="input-field input-text-field">
                        <label>Confirm Password</label><br></br>
                        <input type="password"></input><br></br>
                    </div>
                        <input type="submit" value="Sign Up" className="submit-btn"></input>
                    </form>
                    <a href="/auth/sign_in">Already have account?</a>
            </div>
        )
    }
}

export default SignUp