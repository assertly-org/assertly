import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import WrapperButton from "./WrapperButton";
import WrapperButton from "./WrapperButton";

describe("WrapperButton", () => {
  const props = { variant: "primary", size: "lg", onClick: "[Function]" };

  const wrapper = mount(<WrapperButton {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });

  it("is successfully clicked", () => {
    const eventTargetWrapper = wrapper
      .find(WrapperButton)
      .find({ variant: "primary", size: "lg" })
      .first();
    eventTargetWrapper.simulate("click");
    // assert outcome such as expect(spy).toHaveBeenCalled();
  });
});
