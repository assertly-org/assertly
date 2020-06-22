import React, { PureComponent } from "react";
import { errorValues, hasDisabledStatus, getFieldValue } from "./utils";

export default class Checkbox extends PureComponent {
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
      <div className={errorClass}>
        <div className="checkbox">
          <label>
            <input
              {...field}
              checked={getFieldValue(values, field.name) === value}
              onChange={() => setFieldValue(field.name, value)}
              disabled={disabled || isDisabledStatus}
              type="checkbox"
            />{" "}
            {label}
          </label>
        </div>
      </div>
    );
  }
}
