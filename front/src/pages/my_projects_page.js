import React from "react";
import ProjectsList from "../components/projects/projects_list";

class MyProjectsPage extends React.Component{
    
    render(){
        return(
            <main>
                <div className="main-title">
                    <h2>
                        My projects
                    </h2>
                    <ProjectsList/>
                </div>
            </main>
        );
    }
}

export default MyProjectsPage