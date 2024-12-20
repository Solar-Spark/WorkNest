import React from "react";

class SignUp extends React.Component{
    render(){
        return(
            <div className="sign-up auth-form">
                <form action="/auth/sign_up" method="POST" className="reg-form">
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
                    <a href="/auth/sign_in">Already have account?</a>
            </div>
        )
    }
}

export default SignUp