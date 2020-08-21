import Component from "components/DesignPatterns/Hoc/Hoc.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Component", () => {
  const props = { placeholder: "hoc", value: 1, name: "checkbox" };

  const wrapper = shallow(<Component {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
