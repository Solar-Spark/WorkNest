import React from "react";
import { deleteTeamById, updateTeam } from "../../../services/api/team_service";
import DropdownWithInput from "../../input/dropdown_input";
import { getUsersByIds, searchUserByUsername } from "../../../services/api/user_service";
import DynamicTeamMembersList from "./dynamic_team_members_list";

class ManageTeamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.team
        ? {
          team_id: this.props.team.team_id,
          name: this.props.team.name,
          members: this.props.team.members,
          project_id: this.props.team.project_id,
          lead: this.props.team.lead.user_id,
        }
        : {
          name: "",
          members: [],
          project_id: null,
          lead: null,
        },
      members: [],
      errorText: "",
    };
  }

  async componentDidMount() {
    if (this.props.team) {
      const members = await getUsersByIds(this.props.team.members);
      this.setState({
        members,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team !== this.props.team && this.props.team) {
      const team = this.props.team;
      this.setState({
        formData: {
          team_id: team.team_id,
          name: team.name,
          members: team.members,
          project_id: team.project_id,
          lead: team.lead.user_id,
        },
        members: [],
      }, async () => {
        const members = await getUsersByIds(team.members);
        this.setState({ members });
      });
    }
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

    if (this.validateForm()) {
      const result = await updateTeam(this.state.formData);
      switch (result.status) {
        case 200:
          this.handleClose();
          break;
        default:
          this.setState({ errorText: result.error });
      }
    }
  };
  handleClose = () => {
    this.setState({errorText: ""});
    this.props.onClose();
  }
  
  handleAddMember = (user) => {
    if (!this.state.members.some((member) => member.user_id === user.user_id)) {
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
    if (user_id === this.state.formData.lead) {
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
  deleteTeam = async () => {
    await deleteTeamById(this.state.formData.team_id);
    this.props.onClose();
  }
  render() {
    if (!this.props.isActive || !this.props.team) {
      return null;
    }
    const { formData } = this.state;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="btn close-btn" onClick={this.handleClose}>
            X
          </button>
          <h1>Edit Team</h1>
          <form onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
            <div className="input-field input-text-field">
              <label>Team name</label>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
            {!formData.lead &&
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
              lead={formData.lead}
              onDelete={this.handleRemoveMember}
            />
            <input type="submit" value="Change Team" className="submit-btn btn" />
          </form>
          <div className="red-btn btn" onClick={async () => await this.deleteTeam()}>Delete team</div>
          <p className="form-err-text">{this.state.errorText}</p>
        </div>
      </div>
    );
  }
}

export default ManageTeamModal;
