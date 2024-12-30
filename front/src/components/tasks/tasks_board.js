import React from "react";
import TaskCatList from "./tasks_cat_list";
import AddTaskModal from "./add_task_modal";
import axiosInstance from "../../configs/axios_instance";

class TasksBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskActive: false,
            tasks: [],
        };
    }

    async getTasks() {
        const user_id = sessionStorage.getItem("user_id");
        if(user_id){
            try {
                const response = await axiosInstance.get(`/tasks/user/${user_id}`);
                this.setState({ tasks: response.data});
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    }

    componentDidMount() {
        console.log(this.state.user_id)
        this.getTasks();
    }

    setAddTaskActive = (isActive) => {
        this.getTasks();
        this.setState({ addTaskActive: isActive });
    };

    render() {
        const { tasks, addTaskActive } = this.state;

        return (
            <div className="tasks-board">
                <div className="categories-container">
                    <AddTaskModal
                        isActive={addTaskActive}
                        onClose={() => this.setAddTaskActive(false)} 
                    />
                    <TaskCatList status="To Do" tasks={tasks} />
                    <TaskCatList status="In Progress" tasks={tasks} />
                    <TaskCatList status="Done" tasks={tasks} />
                </div>
                <button
                    className="blue-btn btn"
                    onClick={() => this.setAddTaskActive(true)}>
                    Add Task
                </button>
            </div>
        );
    }
}

export default TasksBoard;
