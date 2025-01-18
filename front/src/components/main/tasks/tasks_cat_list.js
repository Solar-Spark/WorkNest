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
                className="tasks-cat-list"
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
                            <p>{item.description}</p>
                            <br />
                            <p><b>Deadline:</b> {new Date(item.deadline).toLocaleDateString()}</p>
                            {(hasProjectManagerRole(item.project_id) || hasTeamLeadRole(item.team_id)) && <button className="btn red-btn" onClick={() => this.props.deleteItem(item.task_id)}>Delete</button>}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskCatList;
