import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board"
import TeamsList from "../components/main/teams/teams_list";
import { fetchProjectTasks } from "../services/api/task_service";
import CreateTaskModal from "../components/main/tasks/create_task_modal";
import { deleteProjectById, getProjectById } from "../services/api/project_service";
import CreateTeamModal from "../components/main/teams/create_team_modal";
import { getTeamsByProjectId } from "../services/api/team_service";
class ProjectPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addTaskActive: false,
            addTeamActive: false,
            project: null,
        }
        this.tasksBoardRef = React.createRef();
        this.teamsListRef = React.createRef();
    }
    async componentDidMount(){
        const project = await getProjectById(Number(sessionStorage.getItem("project_id")));
        this.setState({ project })
    }
    updateTasks = async () => {
        if (this.tasksBoardRef.current) {
            await this.tasksBoardRef.current.fetchAndUpdateTasks();
        }
    };
    updateTeams = async () => {
        if (this.teamsListRef.current) {
            await this.teamsListRef.current.fetchAndUpdateTeams();
        }
    };
    setAddTaskActive = async (isActive) => {
        this.updateTasks();
        this.setState({ addTaskActive: isActive });
    };
    setAddTeamActive = async (isActive) => {
        this.updateTasks();
        this.setState({ addTeamActive: isActive });
    };
    deleteProject = async () => {
        await deleteProjectById(this.state.project.project_id);
        window.location.href = '/tasks';
    }
    render(){
        const { addTaskActive, addTeamActive, project } = this.state;
        if (!project) {
            return(<main><div>Loading...</div></main>);
        }
        return(
            <main>
                <div className="main-title">
                    <h2>
                        { project.name }
                    </h2>
                    <div className="tasks-board-create">
                        <CreateTaskModal
                            isActive={addTaskActive}
                            onClose={async() => await this.setAddTaskActive(false)}
                            project={project}
                        />
                        <TasksBoard ref={this.tasksBoardRef} fetchTasks={async () => {return await fetchProjectTasks(project.project_id)}}/>
                        <button
                            className="blue-btn btn"
                            onClick={async () => await this.setAddTaskActive(true)}>
                            Add Task
                        </button>
                    </div>
                    <TeamsList 
                        ref={this.teamsListRef} 
                        fetchTeams={async () => {return await getTeamsByProjectId(project.project_id)}} 
                        project_id={Number(sessionStorage.getItem("project_id"))} 
                        header="Project teams"
                    />
                    <CreateTeamModal
                        isActive={addTeamActive}
                        onClose={async() => await this.setAddTeamActive(false)}
                        project={project}
                    />
                    <button
                            className="blue-btn btn"
                            onClick={async () => await this.setAddTeamActive(true)}>
                            Add Team
                    </button>
                    <button onClick={this.deleteProject} className="red-btn btn">Delete Project</button>
                </div>
            </main>
        );
    }
}

export default ProjectPage;