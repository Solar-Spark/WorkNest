import React from "react";

class TaskCatList extends React.Component{
    constructor(props){
        super(props);
        this.category = props.category;
        this.tasks = [{"name" : "Task 1", "description" : "Description of task 1"}, {"name" : "Task 2", "description" : "Description of task 2"}];
    }
    render(){
        return(
            <div className="tasks-cat-list">
                <h3>{this.category}</h3>
                <ul className="elements-list">
                    {this.tasks.map((item, index) => (
                        <li key={index} className="elements-list-item">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskCatList