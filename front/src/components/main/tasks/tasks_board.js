import React from "react";
import TaskCatList from "./tasks_cat_list";
import { deleteTaskById, updateTask } from "../../../services/api/task_service";
import { fetchProjectTasks } from "../../../services/api/task_service";
import CreateTaskModal from "./create_task_modal";
import ManageTaskModal from "./manage_task_modal";

class TasksBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskActive: false,
            manageTaskActive: false,
            manageTask: null,
            tasks: [],
            project: this.props.project,
        };
    }

    async componentDidMount() {
        this.fetchAndUpdateTasks();
    }

    fetchAndUpdateTasks = async () => {
        const tasks = await this.props.fetchTasks();
        this.setState({ tasks });
    };

    deleteTask = async (task_id) => {
        await deleteTaskById(task_id);
        this.fetchAndUpdateTasks();
    }
    setAddTaskActive = async (isActive) => {
        await this.fetchAndUpdateTasks();
        this.setState({ addTaskActive: isActive });
    };
    setManageTaskActive = async (isActive, task) => {
        await this.fetchAndUpdateTasks();
        if (task) {
            this.setState({ manageTask: task, manageTaskActive: isActive });
        }
        this.setState({ manageTaskActive: isActive });
    };

    handleTaskDrop = async (task_id, newStatus) => {
        for (const task of this.state.tasks) {
            if (task.task_id === parseInt(task_id)) {
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
        const { tasks, addTaskActive, manageTaskActive, manageTask, project } = this.state;

        const { addTaskEnabled } = this.props;

        const tasksByStatus = {
            "To Do": tasks.filter((task) => task.status === "To Do"),
            "In Progress": tasks.filter((task) => task.status === "In Progress"),
            "Completed": tasks.filter((task) => task.status === "Completed"),
        };
        const classByStatus = {
            "To Do": "blue",
            "In Progress": "yellow",
            "Completed": "green"
        }

        return (
            <div className="tasks-board">
                <div className="categories-container">
                    {Object.keys(tasksByStatus).map((status) => (
                        <TaskCatList
                            key={status}
                            status={status}
                            tasks={tasksByStatus[status]}
                            additionalClass={classByStatus[status]}
                            onTaskDrop={(task_id) => this.handleTaskDrop(task_id, status)}
                            manageTask={((task) => this.setManageTaskActive(true, task))}
                            deleteItem={(task_id) => this.deleteTask(task_id)}
                        />
                    ))}
                </div>
                {addTaskEnabled &&
                    <span>
                        <CreateTaskModal
                            isActive={addTaskActive}
                            onClose={async () => await this.setAddTaskActive(false)}
                            project={project}
                        />
                        <button
                            className="blue-btn btn"
                            onClick={async () => await this.setAddTaskActive(true)}
                        >
                            Add Task
                        </button>
                    </span>
                }
                {manageTaskActive && manageTask &&
                    <span>
                        <ManageTaskModal
                            isActive={manageTaskActive}
                            onClose={async () => await this.setManageTaskActive(false)}
                            task={manageTask}
                        />
                    </span>
                }
            </div>
        );
    }
}

export default TasksBoard;