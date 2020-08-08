import Design from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/DesignPatterns/DesignPatterns.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Design", () => {
  const props = {
    history: {
      length: 3,
      action: "PUSH",
      location: {
        pathname: "/designpatterns",
        search: "",
        hash: "",
        key: "thlyit",
      },
    },
    location: {
      pathname: "/designpatterns",
      search: "",
      hash: "",
      key: "thlyit",
    },
    match: {
      path: "/designpatterns",
      url: "/designpatterns",
      isExact: true,
      params: {},
    },
  };

  const wrapper = shallow(<Design {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
