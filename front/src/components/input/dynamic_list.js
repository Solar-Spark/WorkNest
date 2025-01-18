import React, { Component } from "react";

class DynamicList extends Component {
  render() {
    const { title, items, onDelete } = this.props;

    return (
      <div className="dynamic-list">
        <h3>{title}</h3>
        <ul className="dynamic-list-items">
          {items.map((item) => (
            <li key={item.id} >
              <div className="dynamic-list-item">
                <h4>{item.username}</h4>
                <button
                  onClick={() => onDelete(item.id)}
                  className="red-btn btn"
                  style={{ marginLeft: "10px" }}
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

export default DynamicList;
