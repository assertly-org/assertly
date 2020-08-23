import React from "react";

const Hoc = (params) => {
  return (ComposedComponent) => {
    class WithComposedComponent extends React.Component {
      render() {
        return <ComposedComponent {...params} {...this.props} />;
      }
    }
    WithComposedComponent.displayName = `HOC(${getDisplayName(ComposedComponent)})`;
    return WithComposedComponent;
  }
};

function getDisplayName(WrappedComponent) {
  console.log('WrappedComponent', WrappedComponent.name, WrappedComponent.displayName);
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default Hoc;

