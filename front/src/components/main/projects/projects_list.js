import React from "react";
import { fetchProjects } from "../../../services/api/project_service";
import CreateProjectModal from "./create_project_modal";

class ProjectsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            createProjectActive: false,
        }
    }

    async componentDidMount() {
        this.setState({ projects: await fetchProjects()});
    }

    setCreateProjectActive = async (isActive) => {
        this.setState({ projects: await fetchProjects(), createProjectActive: isActive });
    };

    manageProject = (project_id) => {
        sessionStorage.setItem("project_id", project_id);
        window.location.href = "/project";
    }
    render(){
        const { projects, createProjectActive } = this.state;
        return(
            <div className="projects-list">
                <CreateProjectModal 
                    isActive={createProjectActive}
                    onClose={async () => await this.setCreateProjectActive(false)}
                />
                <ul className="nav-elements-list">
                    {projects.map((item, index) => (
                        <li key={index} className="nav-elements-list-item" onClick={() => this.manageProject(item.project_id)}>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <h4>Manager: {item.manager.username}</h4>
                        </li>
                    ))}
                </ul>
                <button
                    className="blue-btn btn"
                    onClick={async () => await this.setCreateProjectActive(true)}>
                    Create Project
                </button>
            </div>
        );
    }
}

export default ProjectsList;