import Component from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/DesignPatterns/Hoc/Hoc.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Component", () => {
  const props = { placeholder: "hoc", value: 2, name: "radio-hoc" };

  const wrapper = shallow(<Component {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
