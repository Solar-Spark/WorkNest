import React from "react";
import TaskCatList from "./tasks_cat_list";
import AddTaskModal from "./add_task_modal";

class TasksBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            addTaskActive: false,
        };
    }

    setAddTaskActive = (isActive) => {
        this.setState({addTaskActive: isActive});
    };

    render(){
        return(
            <div className="tasks-board">
                <div className="categories-container">
                    <AddTaskModal isActive={this.state.addTaskActive}/>
                    <TaskCatList category="To Do" />
                    <TaskCatList category="In Progress" />
                    <TaskCatList category="Done" />
                </div>
                <button className="blue-btn btn" onClick={() => this.setAddTaskActive(true)}>Add Task</button>
            </div>
        )
    }
}
export default TasksBoard