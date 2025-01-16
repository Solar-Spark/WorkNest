import React from "react";
import { createTask } from "../../../services/api/task_service";

class CreateTaskModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            statuses: ["To Do", "In Progress", "Completed"],
            formData: {
                name: "",
                project_id: "",
                description: "",
                deadline: "",
                status: "To Do",
                priority: "hot",
                assigned_to: 151,
                team_id: 1,
            },
            errorText: "",
        }
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

    validateForm = () => {
        return !Object.values(this.state.formData).some(value => value === null || value === undefined || value === "");
    }

    handleSubmit = async (e) => {
            e.preventDefault();
            console.log(this.state.formData);
            if(this.props.project){
                await this.setState((prevState) => ({
                    formData: {
                        ...prevState.formData,
                        project_id: Number(sessionStorage.getItem("project_id")),
                    },
                }));
            }
            if (this.validateForm()) {
                const result = await createTask(this.state.formData);
                switch(result.status){
                    case 201:
                        this.props.onClose();
                        break;
                    default:
                        this.setState({errorText: result.error});
                }
            }
            else{
                this.setState({errorText: "Fill all labels"});
            }
    };
    render(){
        if(!this.props.isActive){
            return;
        }
        return(
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                    className="btn close-btn"
                    onClick={this.props.onClose}
                >
                    X
                </button>
                <h1>Create Task</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field input-text-field">
                        <label>Task name</label>
                        <br />
                        <input
                            type="text"
                            value={this.state.formData.name}
                            name="name"
                            onChange={this.handleChange}
                        />
                        <br />
                    </div>
                    <div className="input-field input-text-field">
                        <label>Task description</label>
                        <br />
                        <textarea
                            name="description"
                            value={this.state.formData.description}
                            rows="5"
                            onChange={this.handleChange}
                        />
                        <br />
                    </div>
                    <div className="input-field">
                        <label>Select deadline</label>
                        <br />
                        <input
                            type="datetime-local"
                            value={this.state.formData.deadline}
                            name="deadline"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label>Select status</label>
                        <br />
                        <select
                            name="status"
                            value={this.state.formData.status}
                            onChange={this.handleChange}
                        >
                            {this.state.statuses.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Create Task" className="submit-btn btn"/>
                </form>
            </div>
        </div>
        )
    }
}

export default CreateTaskModal;
