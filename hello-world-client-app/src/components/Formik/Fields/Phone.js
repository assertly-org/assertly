import React from "react";
import { errorValues } from "./utils";
import MaskedInput from "react-text-mask";

const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

export default class PhoneField extends React.PureComponent {
  handleChange = event => {
    const { field, form } = this.props;
    const cleanValue = this.stripCharacters(event.target.value);
    form.setFieldValue(field.name, cleanValue, true);
  };

  stripCharacters = string => {
    const re = new RegExp(/[()\- ]+/, "g");
    return string.replace(re, "");
  };

  render() {
    const { placeholder, label, field, disabled } = this.props;
    const { fieldTouched, fieldError, errorClass } = errorValues(this.props);

    return (
      <div className={errorClass}>
        <label>{label}</label>
        <div>
          <MaskedInput
            mask={phoneNumberMask}
            {...field}
            disabled={disabled}
            id={field.name}
            placeholder={placeholder}
            onChange={this.handleChange}
            className="form-control"
            type="text"
          />
          {fieldTouched && fieldError && (
            <span className="has-error">{fieldError}</span>
          )}
        </div>
      </div>
    );
  }
}
