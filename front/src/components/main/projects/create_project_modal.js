import React from "react";
import { createProject } from "../../../services/api/project_service";
import { updateUserData } from "../../../services/api/user_service";
import { getTokenData } from "../../../utils/jwt_util";

class CreateProjectModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                name: "",
                description: "",
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
            updateUserData(getTokenData(localStorage.getItem("authToken")).data.user_id);
            if (this.validateForm()) {
                const result = await createProject(this.state.formData);
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
                <h1>Create Project</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field input-text-field">
                        <label>Project name</label>
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
                        <label>Project description</label>
                        <br />
                        <textarea
                            name="description"
                            value={this.state.formData.description}
                            rows="5"
                            onChange={this.handleChange}
                        />
                        <br />
                    </div>
                    <input type="submit" value="Create Project" className="submit-btn btn"/>
                </form>
            </div>
        </div>
        )
    }
}

export default CreateProjectModal;
