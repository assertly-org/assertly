import WrapperButton from "WrapperButton.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const handlers = {
  onClick() {
    return true;
  },
};

describe("WrapperButton", () => {
  const spy = jest.spyOn(handlers, "onClick");

  const props = {
    variant: "primary",
    size: "lg",
    onClick: () => handlers.onClick(),
  };

  const wrapper = shallow(<WrapperButton {...props} />);

  wrapper.simulate("click");

  it("is successfully clicked", () => {
    expect(spy).toHaveBeenCalled();
  });

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
