import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CounterCard from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/CounterCard/CounterCard.js";

configure({ adapter: new Adapter() });

describe("CounterCard", () => {
  const props = {
    onClick: "[Function]",
    disabled: false,
    type: "button",
    className: "btn btn-primary btn-lg",
    variant: "primary",
    size: "lg",
    active: false,
    history: {
      length: 5,
      action: "PUSH",
      location: {
        pathname: "/countercard",
        search: "",
        hash: "",
        key: "zrb1sx",
      },
    },
    location: { pathname: "/countercard", search: "", hash: "", key: "zrb1sx" },
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
