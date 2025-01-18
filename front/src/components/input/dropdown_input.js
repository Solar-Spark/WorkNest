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
    this.searchTimeout = null;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue, isOpen: true });

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(async () => {
      if (inputValue.trim() !== "") {
        const options = await this.props.search(inputValue);
        this.setState({ filteredOptions: options });
      } else {
        this.setState({ filteredOptions: [] });
      }
    }, this.props.searchDelay || 500);
  };

  handleOptionClick = (option) => {
    this.props.onSelect(option.value);
    this.setState({ isOpen: false });
    if (this.props.clearOnEntered) {
      this.setState({ inputValue: "" });
    }
  };

  render() {
    const { inputValue, filteredOptions, isOpen } = this.state;

    return (
      <div className="dropdown-input" ref={this.dropdownRef}>
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputChange}
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
