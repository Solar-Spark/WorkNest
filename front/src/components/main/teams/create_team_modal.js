import React from "react";
import { createTeam } from "../../../services/api/team_service";
import DropdownWithInput from "../../input/dropdown_input";
import { searchUserByUsername } from "../../../services/api/user_service";
import DynamicList from "../../input/dynamic_list";

class CreateTeamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        members: [], // Хранит только user_id участников
        project_id: this.props.project.project_id,
        lead: null, // user_id лида команды
      },
      members: [], // Хранит объекты пользователей для отображения в списке
      errorText: "",
    };
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращает отправку формы
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
    if(this.state.formData.members.length > 1)
    return !Object.values(this.state.formData).some(
      (value) => value === null || value === undefined || value === ""
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const result = await createTeam(this.state.formData); // Отправляем formData с user_id
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

  // Добавление пользователя в список
  handleAddMember = (user) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        members: [...prevState.formData.members, user.user_id], // Только user_id
      },
      members: [...prevState.members, user], // Сохраняем объект для отображения
    }));
  };

  // Добавление лида
  handleAddLead = (user) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        lead: user.user_id, // Сохраняем user_id лида
      },
    }));
    this.handleAddMember(user);
  };

  // Удаление пользователя из списка
  handleRemoveMember = (userId) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        members: prevState.formData.members.filter((id) => id !== userId), // Удаляем user_id
      },
      members: prevState.members.filter((user) => user.user_id !== userId), // Удаляем объект
    }));
  };

  render() {
    if (!this.props.isActive) {
      return null;
    }
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
            <div className="input-field input-text-field">
              <label>Team members</label>
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
            <DynamicList
              title="Team members"
              items={this.state.members.map((user) => ({
                id: user.user_id,
                username: user.username,
              }))}
              onDelete={this.handleRemoveMember}
            />
            <input type="submit" value="Create Team" className="submit-btn btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTeamModal;
