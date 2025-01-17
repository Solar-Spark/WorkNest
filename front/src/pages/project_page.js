import React from "react";
import TasksBoard from "../components/main/tasks/tasks_board"
import TeamsList from "../components/main/teams/teams_list";
import { fetchProjectTasks } from "../services/api/task_service";
import CreateTaskModal from "../components/main/tasks/create_task_modal";
import { getProjectById } from "../services/api/project_service";
class ProjectPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addTaskActive: false,
            project: null,
        }
        this.tasksBoardRef = React.createRef();
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
    setAddTaskActive = async (isActive) => {
        this.updateTasks();
        this.setState({ addTaskActive: isActive });
    };
    render(){
        const { addTaskActive, project } = this.state;
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
                        <TasksBoard ref={this.tasksBoardRef} fetchTasks={async () => {return await fetchProjectTasks(this.state.project.project_id)}}/>
                        <button
                            className="blue-btn btn"
                            onClick={async () => await this.setAddTaskActive(true)}>
                            Add Task
                        </button>
                    </div>
                    <TeamsList project_id={Number(sessionStorage.getItem("project_id"))} header="Project teams"/>
                </div>
            </main>
        );
    }
}

export default ProjectPage;