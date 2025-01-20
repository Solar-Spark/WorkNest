import React from "react";
import { createTask, updateTask } from "../../../services/api/task_service";
import { getTeamsByProjectId } from "../../../services/api/team_service";
import { getUsersByTeamId } from "../../../services/api/user_service";

class ManageTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: ["To Do", "In Progress", "Completed"],
            priorities: ["low", "medium", "high"],
            formData:
                this.props.task
                    ? {
                        name: "",
                        project_id: null,
                        description: "",
                        deadline: "",
                        status: "To Do",
                        priority: "hot",
                        assigned_to: null,
                        team_id: null,
                    }
                    : {
                        name: this.props.task.name,
                        project_id: this.props.task.project_id,
                        description: this.props.task.description,
                        deadline: this.formatDateForInput(this.props.task.deadline),
                        status: this.props.task.status,
                        priority: this.props.task.priority,
                        assigned_to: this.props.task.assigned_to,
                        team_id: this.props.task.team_id,
                    },
            teams: null,
            teamMembers: [],
            errorText: "",
        }
    }
    formatDateForInput = (isoDate) => {
        const date = new Date(isoDate);
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
    }
    async componentDidMount() {
        const {task} = this.props;
        if (task.project_id) {
            this.setState({
                formData: {
                    task_id: task.task_id,
                    name: task.name,
                    project_id: task.project_id,
                    description: task.description,
                    deadline: this.formatDateForInput(task.deadline),
                    status: task.status,
                    priority: task.priority,
                    assigned_to: task.assigned_to,
                    team_id: task.team_id,
                },
            }
            );
            const teams = await getTeamsByProjectId(task.project_id);
            const teamMembers = await getUsersByTeamId(task.team_id);
            this.setState({ teamMembers });
            this.setState({ teams });
        }
    }

    handleChange = async (e) => {
        const { name, value } = e.target;
    
        if (name === "team_id") {
            const teamMembers = await getUsersByTeamId(value);
            this.setState({ teamMembers });
        }
    
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
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
        this.setState({
            formData: {
                name: "",
                project_id: null,
                description: "",
                deadline: "",
                status: "",
                priority: "",
                assigned_to: null,
                team_id: null,
            }
        });
        this.setState({ errorText: "" });
        this.props.onClose()
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.formData);
        if (this.validateForm()) {
            const result = await updateTask(this.state.formData);
            switch (result.status) {
                case 200:
                    this.handleClose();
                    break;
                default:
                    this.setState({ errorText: result.error });
            }
        }
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };
    getUser = (user_id) => {
        const member = this.state.teamMembers.find(user => user.user_id === user_id);
        return member.username;;
    }

    render() {
        const { teams, teamMembers } = this.state;
        const { team_id } = this.state.formData;
        
        if (!this.props.isActive && teamMembers.length > 0) {
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
                    <h1>Manage Task</h1>
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
                            <label>Select team</label>
                            <br />
                            <select
                                name="team_id"
                                value={this.state.formData.team_id}
                                onChange={this.handleChange}
                            >
                                <option key={0} value={null}>
                                    
                                </option>
                                {teams && teams.map((team, index) => (
                                    <option key={index} value={team.team_id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {team_id &&
                            <div className="input-field">
                            <label>Select user</label>
                            <br />
                            <select
                                name="assigned_to"
                                value={null}
                                onChange={this.handleChange}
                            >
                                <option key={0} value={this.state.formData.assigned_to}>
                                    {this.state.teamMembers && this.state.teamMembers.length > 0
                                    ? this.getUser(this.state.formData.assigned_to)
                                    : "Select a user"}
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
                        <div className="input-field">
                            <label>Select priority</label>
                            <br />
                            <select
                                name="priority"
                                value={this.state.formData.priority}
                                onChange={this.handleChange}
                            >
                                {this.state.priorities.map((priority, index) => (
                                    <option key={index} value={priority}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input type="submit" value="Change Task" className="submit-btn btn" />
                    </form>
                    <p className="form-err-text">{this.state.errorText}</p>
                </div>
            </div>
        );
    }
}

export default ManageTaskModal;
