import React from "react";
import TasksBoard from "../components/tasks/tasks_board"
import { fetchProjectTasks } from "../services/api/task_service";
import CreateTaskModal from "../components/tasks/create_task_modal";
class ProjectPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addTaskActive: false,
        }
        this.tasksBoardRef = React.createRef();
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
        const { addTaskActive } = this.state;
        return(
            <main>
                <div className="main-title">
                    <h2>
                        
                    </h2>
                    <button
                        className="blue-btn btn"
                        onClick={async () => await this.setAddTaskActive(true)}>
                        Add Task
                    </button>
                    <CreateTaskModal
                        isActive={addTaskActive}
                        onClose={async() => await this.setAddTaskActive(false)}
                        project={true}
                    />
                    <TasksBoard ref={this.tasksBoardRef} fetchTasks={async () => {return await fetchProjectTasks(Number(sessionStorage.getItem("project_id")))}}/>
                </div>
            </main>
        );
    }
}

export default ProjectPage;