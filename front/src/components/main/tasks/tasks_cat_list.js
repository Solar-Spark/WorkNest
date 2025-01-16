import React from "react";

class TaskCatList extends React.Component {
    render() {
        const { status, tasks } = this.props;
        return (
            <div className="tasks-cat-list">
                <h3>{status}</h3>
                <ul className="elements-list">
                    {tasks.map((item, index) => (
                        <li key={index} className="elements-list-item">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <br />
                            <p><b>Deadline:</b> {new Date(item.deadline).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskCatList;
