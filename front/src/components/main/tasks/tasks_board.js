import React from "react";
import TaskCatList from "./tasks_cat_list";
import { deleteTaskById, updateTask } from "../../../services/api/task_service";

class TasksBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskActive: false,
            tasks: [],
        };
    }

    async componentDidMount() {
        this.setState({ tasks: await this.props.fetchTasks() });
    }

    fetchAndUpdateTasks = async () => {
        const tasks = await this.props.fetchTasks();
        this.setState({ tasks });
    };
    
    deleteTask = async (task_id) =>{
        await deleteTaskById(task_id);
        this.fetchAndUpdateTasks();
    }

    handleTaskDrop = async (task_id, newStatus) => {
        for(const task of this.state.tasks){
            if(task.task_id === parseInt(task_id)){
                const updatedTask = task;
                updatedTask.status = newStatus;
                await updateTask(updatedTask);
            }
        }
        this.setState((prevState) => {
            const tasks = prevState.tasks.map((task) => {
                if (task.task_id === parseInt(task_id)) {
                    return { ...task, status: newStatus };
                }
                return task;
            });
            return { tasks };
        });
    };

    render() {
        const { tasks } = this.state;

        const tasksByStatus = {
            "To Do": tasks.filter((task) => task.status === "To Do"),
            "In Progress": tasks.filter((task) => task.status === "In Progress"),
            "Completed": tasks.filter((task) => task.status === "Completed"),
        };

        return (
            <div className="tasks-board">
                <div className="categories-container">
                    {Object.keys(tasksByStatus).map((status) => (
                        <TaskCatList
                            key={status}
                            status={status}
                            tasks={tasksByStatus[status]}
                            onTaskDrop={(task_id) => this.handleTaskDrop(task_id, status)}
                            deleteItem={(task_id) => this.deleteTask(task_id)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default TasksBoard;