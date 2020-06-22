import React, { PureComponent } from "react";
import { errorValues } from "./utils";
import Select from "react-select";

export default class SelectComponent extends PureComponent {
  render() {
    const {
      label,
      options,
      field,
      form: { setFieldTouched, setFieldValue }
    } = this.props;
    const { fieldTouched, fieldError, errorClass } = errorValues(this.props);

    return (
      <div className={errorClass}>
        <label>{label}</label>
        <Select
          {...field}
          onBlur={() => setFieldTouched(field.name, true, true)}
          options={options}
          value={
            options ? options.find(option => option.value === field.value) : ""
          }
          onChange={option => setFieldValue(field.name, option.value)}
        />
        {fieldTouched && fieldError && (
          <span className="has-error">{fieldError}</span>
        )}
      </div>
    );
  }
}
