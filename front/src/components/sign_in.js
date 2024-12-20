import React from "react";

class SignIn extends React.Component{
    render(){
        return(
            <div className="sign-in auth-form">
                <form action="/auth/sign_in" method="POST" className="reg-form">
                    <div className="input-text-field">
                        <label>Username</label><br></br>
                        <input type="text"></input><br></br>
                    </div>
                    <div className="input-text-field">
                        <label>Password</label><br></br>
                        <input type="password"></input><br></br>
                    </div>
                        <input type="submit" value="Sign In" className="submit-btn"></input>
                    </form>
                    <a href="/auth/sign_up">Haven't account?</a>
            </div>
        )
    }
}
export default SignIn