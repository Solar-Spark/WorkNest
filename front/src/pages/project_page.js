import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board"
import TeamsList from "../components/main/teams/teams_list";
import { fetchProjectTasks } from "../services/api/task_service";
import { deleteProjectById, getProjectById } from "../services/api/project_service";
import { getTeamsByProjectId } from "../services/api/team_service";
import BlockNavbar from "../components/main/block_navbar/block_navbar";
import BarChart from "../components/main/graphs/barchart";
class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskActive: false,
            project: null,
            stage: "tasks",
        }
        this.teamsListRef = React.createRef();
    }
    async componentDidMount() {
        const project = await getProjectById(Number(sessionStorage.getItem("project_id")));
        this.setState({ project })
        await this.updateTasks(project);
    }
    setStage = (stage) => {
        this.setState({ stage });
    }
    deleteProject = async () => {
        await deleteProjectById(this.state.project.project_id);
        window.location.href = '/tasks';
    }
    updateTasks = async (project) => {
        const tasks = await fetchProjectTasks(project.project_id)
        this.setState({tasksBoardActive: true});
        return tasks;
    }

    render() {
        const { project, stage, tasksBoardActive } = this.state;
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
                        {tasksBoardActive &&
                            <TasksBoard
                            project={project}
                            fetchTasks={async () => await this.updateTasks(project)}
                            addTaskEnabled={true}
                            />
                        }
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
                    <BarChart />
                    <button id="delete-project" onClick={this.deleteProject} className="red-btn btn">Delete Project</button>
                </div>}
        </main>
        );
    }
}

export default ProjectPage;