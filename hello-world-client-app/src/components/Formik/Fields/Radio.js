import React, { PureComponent } from "react";
import { errorValues, hasDisabledStatus, getFieldValue } from "./utils";

export default class Input extends PureComponent {
  render() {
    const {
      label,
      disabled,
      field,
      form: { values, setFieldValue, status },
      value
    } = this.props;
    const { errorClass } = errorValues(this.props);
    const isDisabledStatus = hasDisabledStatus(status, field.name);

    return (
      <span className={errorClass}>
        <label className="radio-inline">
          <input
            {...field}
            disabled={disabled || isDisabledStatus}
            checked={getFieldValue(values, field.name) === value}
            onChange={() => setFieldValue(field.name, value)}
            type="radio"
          />{" "}
          {label}
        </label>
      </span>
    );
  }
}
