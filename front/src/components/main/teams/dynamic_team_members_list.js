import React, { Component } from "react";

class DynamicTeamMembersList extends Component {
  render() {
    const { title, items, onDelete, lead } = this.props;

    return (
      <div className="dynamic-list">
        <h3>{title}</h3>
        <ul className="dynamic-list-items">
          {items.map((item) => (
            <li key={item.id} >
              <div className="dynamic-list-item">
                <h4>{item.username} {(item.id === lead) && " (Team Lead) "}</h4>
                <button
                  onClick={() => onDelete(item.id)}
                  className="red-btn btn"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DynamicTeamMembersList;
