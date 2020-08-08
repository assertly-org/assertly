import CounterCard from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/CounterCard/CounterCard.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("CounterCard", () => {
  const props = {
    history: {
      length: 2,
      action: "POP",
      location: {
        pathname: "/countercard",
        search: "",
        hash: "",
        key: "19e8cy",
      },
    },
    location: { pathname: "/countercard", search: "", hash: "", key: "19e8cy" },
    match: {
      path: "/countercard",
      url: "/countercard",
      isExact: true,
      params: {},
    },
  };

  const wrapper = shallow(<CounterCard {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
