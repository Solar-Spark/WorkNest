import React, { Component } from "react";

class DropdownWithInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      filteredOptions: [],
      isOpen: false,
    };

    this.dropdownRef = React.createRef();
  }

  handleKeyDown = async (event) => {
    const inputValue = event.target.value;
    if (event.key === "Enter") {
      const options = await this.props.search(inputValue);
      this.setState({ filteredOptions: options, isOpen: true });
    }
    this.setState({ inputValue });
  };

  handleOptionClick = (option) => {
    this.props.onSelect(option.value); // Передаем весь объект пользователя
    this.setState({ isOpen: false });
    if(this.props.clearOnEntered){
        this.setState({inputValue: ""});
    }
  };

  render() {
    const { inputValue, filteredOptions, isOpen } = this.state;

    return (
      <div className="dropdown-input input-field input-text-field" ref={this.dropdownRef}>
        <input
          type="text"
          value={inputValue}
          onKeyDown={this.handleKeyDown}
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          placeholder="Type to search..."
          className="dropdown-input-text"
        />
        {isOpen && (
          <div className="dropdown-input-items">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-input-item"
                  onClick={() => this.handleOptionClick(option)}
                >
                  {option.text}
                </div>
              ))
            ) : (
              <div className="dropdown-input-not-found">No results found</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DropdownWithInput;
