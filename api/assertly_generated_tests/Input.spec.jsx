import Input from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/DesignPatterns/StateHoisting/Input.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Input", () => {
  const props = {
    type: "text",
    name: "state-hoisting-text",
    value: "Initial",
    onChange: "[Function]",
  };

  const wrapper = shallow(<Input {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
