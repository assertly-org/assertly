import Design from "components/DesignPatterns/DesignPatterns.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Design", () => {
  const props = {
    history: {
      length: 4,
      action: "POP",
      location: {
        pathname: "/designpatterns",
        search: "",
        hash: "",
        state: null,
        key: "k3k2uc",
      },
    },
    location: {
      pathname: "/designpatterns",
      search: "",
      hash: "",
      state: null,
      key: "k3k2uc",
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
