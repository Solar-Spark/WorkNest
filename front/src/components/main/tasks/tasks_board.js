import React from "react";
import TaskCatList from "./tasks_cat_list";

class TasksBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskActive: false,
            tasks: [],
        };
    }
    async componentDidMount() {
        this.setState({tasks: await this.props.fetchTasks()});
    }
    fetchAndUpdateTasks = async () => {
        const tasks = await this.props.fetchTasks();
        this.setState({ tasks });
    };
    render() {
        const { tasks } = this.state;

        const tasksByStatus = {
            "To Do": tasks.filter(task => task.status === "To Do"),
            "In Progress": tasks.filter(task => task.status === "In Progress"),
            "Completed": tasks.filter(task => task.status === "Completed"),
        };

        return (
            <div className="tasks-board">
                <div className="categories-container">
                    <TaskCatList status="To Do" tasks={tasksByStatus["To Do"]} />
                    <TaskCatList status="In Progress" tasks={tasksByStatus["In Progress"]} />
                    <TaskCatList status="Completed" tasks={tasksByStatus["Completed"]} />
                </div>
            </div>
        );
    }
}

export default TasksBoard;
