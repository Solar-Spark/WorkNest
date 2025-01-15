import React from "react";
import SignUp from "../components/sign_up";
import SignIn from "../components/sign_in";
import VerifyOTP from "../components/verify_otp";

class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 'signIn',
            data: {},
          };
        
    }
    changeStep = (step, data) => {
        this.setState({ currentStep: step , data: data});
    };
    
    render(){
        const { currentStep } = this.state;
        return(
            <div className="auth">
                {currentStep === 'signUp' && <SignUp onStepChange={this.changeStep} data={this.state.data} />}
                {currentStep === 'signIn' && <SignIn onStepChange={this.changeStep} data={this.state.data} />}
                {currentStep === 'verifyOtp' && <VerifyOTP onStepChange={this.changeStep} data={this.state.data} />}
            </div>
        )
    }
}

export default Auth