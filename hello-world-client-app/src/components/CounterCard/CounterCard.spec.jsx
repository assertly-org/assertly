import CounterCard from "./CounterCard";
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
        state: null,
        key: "t7me4s",
      },
    },
    location: {
      pathname: "/countercard",
      search: "",
      hash: "",
      state: null,
      key: "t7me4s",
    },
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
