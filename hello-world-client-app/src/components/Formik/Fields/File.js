import React from "react";
import { errorValues } from "./utils";

export default class FileField extends React.Component {
  handleChange = e => {
    const { field, form } = this.props;
    form.setFieldTouched(field.name, true);
    const file = e.currentTarget.files[0];

    if (!file || !file.name) {
      form.setFieldValue(field.name, "");
    } else {
      const reader = new FileReader();
      const imgTag = document.getElementById("myimage");
      imgTag.title = file.name;
      reader.onload = function(event) {
        imgTag.src = event.target.result;
      };
      reader.readAsDataURL(file);
      form.setFieldValue(field.name, file);
    }
  };

  render() {
    const { disabled, label } = this.props;
    const { fieldTouched, fieldError, errorClass } = errorValues(this.props);

    return (
      <div className={errorClass}>
        <label>{label}</label>
        <div>
          <input
            className="form-control"
            disabled={disabled}
            onChange={o => this.handleChange(o)}
            type="file"
          />
          <img src={""} alt="" id={"myimage"} />
          {fieldTouched && fieldError && (
            <span className="has-error">{fieldError}</span>
          )}
        </div>
      </div>
    );
  }
}
