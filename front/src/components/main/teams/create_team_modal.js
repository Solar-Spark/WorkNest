import React from "react";
import { createTeam } from "../../../services/api/team_service";
import DropdownWithInput from "../../input/dropdown_input";
import { searchUserByUsername, updateUserData } from "../../../services/api/user_service";
import DynamicTeamMembersList from "./dynamic_team_members_list";
import { getTokenData } from "../../../utils/jwt_util";

class CreateTeamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        members: [],
        project_id: this.props.project.project_id,
        lead: null,
      },
      members: [],
      errorText: "",
    };
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

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
    const { members, lead } = this.state.formData;

    if (!lead) {
      this.setState({ errorText: "Team lead must be selected" });
      return false;
    }

    if (members.length <= 1) {
      this.setState({ errorText: "Team must contain at least 2 members" });
      return false;
    }

    if (Object.values(this.state.formData).some((value) => value === null || value === undefined || value === "")) {
      this.setState({ errorText: "Enter all fields" });
      return false;
    }

    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    updateUserData(getTokenData(localStorage.getItem("authToken")).data.user_id);
    if (this.validateForm()) {
      const result = await createTeam(this.state.formData);
      switch (result.status) {
        case 201:
          this.props.onClose();
          break;
        default:
          this.setState({ errorText: result.error });
      }
    } else {
      this.setState({ errorText: "Fill all fields" });
    }
  };

  handleAddMember = (user) => {
    if(!this.state.members.some((member) => member.user_id === user.user_id)){
        this.setState((prevState) => ({
            formData: {
              ...prevState.formData,
              members: [...prevState.formData.members, user.user_id],
            },
            members: [...prevState.members, user],
          }));
    }
  };

  handleAddLead = (user) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        lead: user.user_id,
      },
    }));
    this.handleAddMember(user);
  };

  handleRemoveMember = (user_id) => {
    if(user_id === this.state.formData.lead){
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                lead: null,
              }
        }));
    }
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        members: prevState.formData.members.filter((id) => id !== user_id),
      },
      members: prevState.members.filter((user) => user.user_id !== user_id),
    }));
  };

  render() {
    if (!this.props.isActive) {
      return null;
    }
    const { lead } = this.state.formData;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="btn close-btn" onClick={this.props.onClose}>
            X
          </button>
          <h1>Create Team</h1>
          <form onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
            <div className="input-field input-text-field">
              <label>Team name</label>
              <br />
              <input
                type="text"
                value={this.state.formData.name}
                name="name"
                onChange={this.handleChange}
              />
              <br />
            </div>
            {!this.state.formData.lead &&
                <div className="input-field input-text-field">
                    <label>Team lead</label>
                    <DropdownWithInput
                        search={async (prompt) => {
                        const users = await searchUserByUsername(prompt);
                        return users.map((user) => ({
                            text: user.username,
                            value: user,
                        }));
                        }}
                        onSelect={this.handleAddLead}
                    />
                </div>
            }
            <div className="input-field input-text-field">
              <label>Add team members</label>
              <DropdownWithInput
                search={async (prompt) => {
                  const users = await searchUserByUsername(prompt);
                  return users.map((user) => ({
                    text: user.username,
                    value: user,
                  }));
                }}
                onSelect={this.handleAddMember}
              />
            </div>
            <DynamicTeamMembersList
              title="Team members"
              items={this.state.members.map((user) => ({
                id: user.user_id,
                username: user.username,
              }))}
              lead={lead}
              onDelete={this.handleRemoveMember}
            />
            <input type="submit" value="Create Team" className="submit-btn btn" />
          </form>
          <p className="form-err-text">{this.state.errorText}</p>
        </div>
      </div>
    );
  }
}

export default CreateTeamModal;
