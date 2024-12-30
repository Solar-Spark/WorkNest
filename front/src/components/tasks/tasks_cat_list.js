import React from "react";

class TaskCatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_status: props.status,
            tasks: props.tasks.filter(task => task.status === props.status),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status || prevProps.tasks !== this.props.tasks) {
            this.setState({
                task_status: this.props.status,
                tasks: this.props.tasks.filter(task => task.status === this.props.status),
            });
        }
    }

    render() {
        return (
            <div className="tasks-cat-list">
                <h3>{this.state.task_status}</h3>
                <ul className="elements-list">
                    {this.state.tasks.map((item, index) => (
                        <li key={index} className="elements-list-item">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <br></br>
                            <p><b>Deadline:</b> {new Date(item.deadline).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskCatList;
