import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Text from "./Text";
import { componentProps } from "./TextProps.js";

describe("Text", () => {
  const props = { ...componentProps };

  const wrapper = shallow(<Text {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
