import React from "react";

const options = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "golang", label: "Go" }
];

export default class Input extends React.Component {
  state = {
    options: []
  };

  componentDidMount() {
    setTimeout(() => this.setState({ options }), 1000);
  }
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <div>{this.props.render(this.state.options)}</div>
      </div>
    );
  }
}
