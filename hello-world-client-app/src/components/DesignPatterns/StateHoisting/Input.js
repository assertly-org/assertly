import React from "react";

export default class InputContainer extends React.Component {
  constructor() {
    super();
    this.state = { value: "Initial" };
  }

  render() {
    return (
      <Input
        {...this.props}
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

const Input = ({ name, type, value, onChange }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);
