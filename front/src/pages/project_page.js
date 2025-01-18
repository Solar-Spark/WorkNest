import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board"
import TeamsList from "../components/main/teams/teams_list";
import { fetchProjectTasks } from "../services/api/task_service";
import CreateTaskModal from "../components/main/tasks/create_task_modal";
import { deleteProjectById, getProjectById } from "../services/api/project_service";
import { getTeamsByProjectId } from "../services/api/team_service";
import BlockNavbar from "../components/main/block_navbar/block_navbar";
class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskActive: false,
            project: null,
            stage: "tasks",
        }
        this.tasksBoardRef = React.createRef();
        this.teamsListRef = React.createRef();
    }
    async componentDidMount() {
        const project = await getProjectById(Number(sessionStorage.getItem("project_id")));
        this.setState({ project })
    }
    setStage = (stage) => {
        this.setState({ stage });
    }
    updateTasks = async () => {
        if (this.tasksBoardRef.current) {
            await this.tasksBoardRef.current.fetchAndUpdateTasks();
        }
    };
    setAddTaskActive = async (isActive) => {
        this.updateTasks();
        this.setState({ addTaskActive: isActive });
    };
    deleteProject = async () => {
        await deleteProjectById(this.state.project.project_id);
        window.location.href = '/tasks';
    }
    render() {
        const { addTaskActive, project, stage } = this.state;
        if (!project) {
            return (<main><div>Loading...</div></main>);
        }
        return (
            <main>
            <div className="main-title">
                <h2>
                    {project.name}
                </h2>
            </div>
                <BlockNavbar setStage={this.setStage} />
                
                {stage === "tasks" &&
                    <div className="tasks-board-create">
                        <CreateTaskModal
                            isActive={addTaskActive}
                            onClose={async () => await this.setAddTaskActive(false)}
                            project={project}
                        />
                        <TasksBoard
                            ref={this.tasksBoardRef}
                            fetchTasks={async () => {
                                return await fetchProjectTasks(project.project_id);
                            }}
                        />
                        <button
                            className="blue-btn btn"
                            onClick={async () => await this.setAddTaskActive(true)}
                        >
                            Add Task
                        </button>
                    </div>
                }
                {stage === "teams" &&
                    <TeamsList
                        ref={this.teamsListRef}
                        fetchTeams={async () => {
                            return await getTeamsByProjectId(project.project_id);
                        }}
                        project={project}
                        header="Project teams"
                    />
                }
                {stage === "info" && 
                <div>
                    <p>Description of project: {project.description}</p>
                    <button id="delete-project" onClick={this.deleteProject} className="red-btn btn">Delete Project</button>
                </div>}
        </main>
        );
    }
}

export default ProjectPage;