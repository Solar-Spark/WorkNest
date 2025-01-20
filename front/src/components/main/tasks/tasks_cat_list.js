import React from "react";
import { hasProjectManagerRole, hasTeamLeadRole } from "../../../services/currentUserInfoService";

class TaskCatList extends React.Component {
    handleDragStart = (e, task_id) => {
        e.dataTransfer.setData("task_id", task_id);
    };

    handleDrop = (e) => {
        const task_id = e.dataTransfer.getData("task_id");
        this.props.onTaskDrop(task_id);
    };

    handleDragOver = (e) => {
        e.preventDefault();
    };

    render() {
        const { status, tasks } = this.props;
        return (
            <div
                className={`tasks-cat-list ${this.props.additionalClass}`}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <h3>{status}</h3>
                <ul className="elements-list">
                    {tasks.map((item, index) => (
                        <li
                            key={index}
                            className="elements-list-item"
                            draggable
                            onDragStart={(e) => this.handleDragStart(e, item.task_id)}
                        >
                            <h4>{item.name}</h4>
                            <p className="task-description">{item.description}</p>
                            <br />
                            <p>Priority: {item.priority}</p>
                            <p><b>Deadline:</b> {new Date(item.deadline).toLocaleDateString()}</p>
                            {(hasProjectManagerRole(item.project_id) || hasTeamLeadRole(item.team_id)) && 
                                <div className="task-btn-container">
                                    <button className="btn blue-btn delete-task-btn btn-with-icon" onClick={() => this.props.manageTask(item)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                    <button className="btn red-btn delete-task-btn btn-with-icon" onClick={() => this.props.deleteItem(item.task_id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskCatList;
