import Input from "/Users/zealotsd/Repos/assertly/hello-world-client-app/src/components/Formik/Fields/Radio.js";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Input", () => {
  const props = {
    field: { value: 2, name: "radioField" },
    form: {
      values: {
        checkboxField: "",
        phoneField: "",
        radioField: 1,
        selectField: "",
        textField: "",
      },
      errors: {
        textField: "Required",
        selectField: "Required",
        checkboxField: "Required",
        toggleButton: "Required",
        phoneField: "Required",
      },
      touched: { textField: true },
      isSubmitting: false,
      isValidating: false,
      submitCount: 0,
      dirty: true,
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
    type: "radio",
    value: 2,
    label: "Value 2",
  };

  const wrapper = shallow(<Input {...props} />);

  it("exists and is not null", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getElement()).not.toBe(null);
  });
});
