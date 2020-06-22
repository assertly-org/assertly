import React, { PureComponent } from "react";
import { errorValues, hasDisabledStatus } from "./utils";

export default class Text extends PureComponent {
  render() {
    const {
      label,
      min,
      type,
      placeholder,
      defaultValue,
      maxLength,
      disabled,
      field,
      form: { status }
    } = this.props;
    const { fieldTouched, fieldError, errorClass } = errorValues(this.props);
    const isDisabledStatus = hasDisabledStatus(status, field.name);

    return (
      <div className={errorClass}>
        <label>{label}</label>
        <div>
          <input
            {...field}
            defaultValue={defaultValue}
            disabled={disabled || isDisabledStatus}
            maxLength={maxLength}
            min={min}
            placeholder={placeholder ? placeholder : label}
            type={type}
            value={field.value || ""}
            className="form-control my-text-field"
            data-foo="test-val"
          />
          {fieldTouched && fieldError && (
            <span className="has-error">{fieldError}</span>
          )}
        </div>
      </div>
    );
  }
}
