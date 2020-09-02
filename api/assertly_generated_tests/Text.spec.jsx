import Text from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/Formik/Fields/Text.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Text", () => {
  const props = {
    field: { value: "", name: "textField" },
    form: {
      values: {
        checkboxField: "",
        phoneField: "",
        radioField: "",
        selectField: "",
        textField: "",
      },
      errors: {},
      touched: {},
      isSubmitting: false,
      isValidating: false,
      submitCount: 0,
      dirty: false,
      isValid: false,
      initialValues: {
        checkboxField: "",
        phoneField: "",
        radioField: "",
        selectField: "",
        textField: "",
      },
      validateOnChange: true,
      validateOnBlur: true,
    },
    type: "text",
    placeholder: "placeholder",
    label: "Text Field",
  };

  const wrapper = shallow(<Text {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
