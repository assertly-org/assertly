import React from "react";

const Hoc = params => ComposedComponent =>
  class extends React.Component {
    render() {
      return <ComposedComponent {...params} {...this.props} />;
    }
  };


export default Hoc;

