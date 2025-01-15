import React from "react";
import { fetchProjects } from "../../services/api/project_service";
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
        this.setState({projects: await fetchProjects()});
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
                <button
                    className="blue-btn btn"
                    onClick={async () => await this.setCreateProjectActive(true)}>
                    Create Project
                </button>
                <CreateProjectModal 
                    isActive={createProjectActive}
                    onClose={async () => await this.setCreateProjectActive(false)}
                />
                <ul className="elements-list">
                    {projects.map((item, index) => (
                        <li key={index} className="elements-list-item">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <h4>Manager: {item.created_by.username}</h4>
                            <button
                                className="blue-btn btn"
                                onClick={() => this.manageProject(item.project_id)}>
                                Manage project
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ProjectsList;