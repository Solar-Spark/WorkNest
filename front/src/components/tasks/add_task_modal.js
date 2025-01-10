import React from "react";
import axiosInstance from "../../configs/axios_instance";
import { getTokenData } from "../../utils/jwt_util"

class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: ["To Do", "In Progress", "Completed"],
            formData: {
                name: "",
                description: "",
                deadline: null,
                status: "To Do",
                project_id: 1,
                team_id: 1,
                assigned_to: getTokenData(localStorage.getItem("token")).user_id,
                priority: "hot",
            },
            errorText : ""
        };
    }

    validateForm(){
        for(const key in this.state.formData){
            if(this.state.formData[key] === ""){
                this.setState({errorText : "Enter all fields"});
                return false;
            }
        }

        return true;
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
        if(this.validateForm()){
            try {
                const response = await axiosInstance.post("/tasks", this.state.formData);
                
                switch(response.status){
                    
                    case 201:
                        console.log("Data sended")
                        this.props.onClose()
                        break;

                    default:
                        this.setState({errorText : "Unknown error"})
                        break;
                }
            } catch (error) {
                console.error("Data send error: ", error);
            }
        }
    };

    render() {
        if (!this.props.isActive) {
            return null;
        }

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button
                        className="btn close-btn"
                        onClick={this.props.onClose}
                    >
                        X
                    </button>
                    <h1>Add Task</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field input-text-field">
                            <label>Task name</label>
                            <br />
                            <input
                                type="text"
                                value={this.state.formData.task_name}
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
                                value={this.state.formData.category}
                                onChange={this.handleChange}
                            >
                                {this.state.statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input type="submit" value="Add Task" className="submit-btn btn"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddTaskModal;
