import App from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/App.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("App", () => {
  const props = {};

  const wrapper = shallow(<App {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
