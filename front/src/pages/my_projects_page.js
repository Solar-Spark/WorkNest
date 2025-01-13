import React from "react";
import { Navigate } from "react-router-dom"

class MyProjectsPage extends React.Component{
    render(){
        if (!localStorage.getItem("token")) {
            return <Navigate to="/auth/sign_in" />;
        }
        return(
            <main>
                <div className="main-title">
                    <h2>
                        My projects
                    </h2>
                </div>
            </main>
        );
    }
}

export default MyProjectsPage