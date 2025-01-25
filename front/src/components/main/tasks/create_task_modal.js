import React from "react";
import { createTask } from "../../../services/api/task_service";
import { getTeamsByProjectId } from "../../../services/api/team_service";
import { getUsersByTeamId, updateUserData } from "../../../services/api/user_service";
import { getTokenData } from "../../../utils/jwt_util";

class CreateTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: ["To Do", "In Progress", "Completed"],
            priorities: ["Low", "Medium", "High"],
            formData: {
                name: "",
                project_id: this.props.project.project_id,
                description: "",
                deadline: "",
                status: "To Do",
                priority: "Low",
                assigned_to: null,
                team_id: null,
            },
            teams: null,
            teamMembers: null,
            errorText: "",
        }
    }
    async componentDidMount() {
        if (this.props.project) {
            const teams = await getTeamsByProjectId(this.props.project.project_id);
            this.setState({ teams });
        }

    }
    handleChange = async (e) => {
        const { name, value } = e.target;
        if(name === "team_id"){
            this.setState({teamMembers : await getUsersByTeamId(value)});
        }
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value.trim(),
            },
        }));
    };

    validateForm = () => {

        if (Object.values(this.state.formData).some((value) => value === null || value === undefined || value === "")) {
            this.setState({ errorText: "Enter all fields" });
            return false;
        }

        return true;
    };
    handleClose = () => {
        this.setState({formData: {
                name: "",
                project_id: this.props.project.project_id,
                description: "",
                deadline: "",
                status: "To Do",
                priority: "low",
                assigned_to: null,
                team_id: null,
            }
        });
        this.setState({errorText: ""});
        this.props.onClose()
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        updateUserData(getTokenData(localStorage.getItem("authToken")).data.user_id);
        if (this.props.project) {
            await this.setState((prevState) => ({
                formData: {
                    ...prevState.formData,
                    team_id: parseInt(this.state.formData.team_id)
                },
            }));
        }
        if (this.validateForm()) {
            const result = await createTask(this.state.formData);
            switch (result.status) {
                case 201:
                    this.handleClose();
                    break;
                default:
                    this.setState({ errorText: result.error });
            }
        }
        else {
            this.setState({ errorText: "Fill all labels" });
        }
    };
    render() {
        const { project } = this.props;
        const { teams, teamMembers } = this.state;
        const { team_id } = this.state.formData;
        
        if (!this.props.isActive) {
            return null;
        }
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button
                        className="btn close-btn"
                        onClick={this.handleClose}
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
                                value={null}
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
                                value={null}
                                rows="5"
                                onChange={this.handleChange}
                            />
                            <br />
                        </div>
                        {project &&
                            <div className="input-field">
                                <label>Select team</label>
                                <br />
                                <select
                                    name="team_id"
                                    value={null}
                                    onChange={this.handleChange}
                                >
                                    <option key={0} value={null}>
                                        
                                    </option>
                                    {teams.map((team, index) => (
                                        <option key={index} value={team.team_id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                        {team_id &&
                            <div className="input-field">
                            <label>Select user</label>
                            <br />
                            <select
                                name="assigned_to"
                                value={null}
                                onChange={this.handleChange}
                            >
                                <option key={0} value={null}>
                                        
                                </option>
                                {teamMembers.map((user, index) => (
                                    <option key={index} value={user.user_id}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        }
                        <div className="input-field">
                            <label>Select deadline</label>
                            <br />
                            <input
                                type="datetime-local"
                                value={null}
                                name="deadline"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field">
                            <label>Select status</label>
                            <br />
                            <select
                                name="status"
                                value={null}
                                onChange={this.handleChange}
                            >
                                {this.state.statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-field">
                            <label>Select priority</label>
                            <br />
                            <select
                                name="priority"
                                value={null}
                                onChange={this.handleChange}
                            >
                                {this.state.priorities.map((priority, index) => (
                                    <option key={index} value={priority}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input type="submit" value="Create Task" className="submit-btn btn" />
                    </form>
                    <p className="form-err-text">{this.state.errorText}</p>
                </div>
            </div>
        )
    }
}

export default CreateTaskModal;
