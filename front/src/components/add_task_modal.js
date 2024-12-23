import React from "react";
import axiosInstance from "../axios_instance";

class AddTaskModal extends React.Component {
	constructor(props){
        super(props)
        this.state = {
            categories : ["To Do", "In Progress", "Done"],
            formData : {
                task_name : "",
                description : "",
                deadline : "",
                category : ""
            }
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/tasks", this.state.formData);
            console.log("Data sended")
        } catch (error) {
            console.error("Data send error: ", error);
        }
    };

    render() {
		if (!this.props.isActive) {
			return null;
		}
		return (
			<div className="modal-overlay">
				<div className="modal-content">
					<button className="btn close-btn">X</button>
                    <h1>Add Task</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="input-field input-text-field">
							<label>Task name</label><br></br>
							<input type="text" value={this.state.formData.task_name} name="task_name" onChange={this.handleChange}></input><br></br>
						</div>
						<div className="input-field input-text-field">
							<label>Task description</label><br></br>
							<textarea name="description" value={this.state.formData.description} rows="5" onChange={this.handleChange}></textarea><br></br>
						</div>
                        <div className="input-field">
                            <label>Select deadline</label><br></br>
                            <input type="datetime-local" value={this.state.formData.deadline} name="deadline" onChange={this.handleChange}></input>
						</div>
						<div className="input-field">
                            <label>Select category</label><br></br>
                            <select name="category" value={this.state.formData.category} onChange={this.handleChange}>
                                {this.state.categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
						</div>
						<input type="submit" value="Add Task" className="submit-btn btn"></input>
					</form>
				</div>
			</div>
		);
	}
}

export default AddTaskModal