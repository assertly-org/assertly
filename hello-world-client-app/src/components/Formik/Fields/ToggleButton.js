import React from 'react';
import {errorValues} from './utils';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export default class ToggleButtonField extends React.PureComponent {
  render() {
    const {
      field,
      form: {setFieldValue},
      label,
      defaultValue,
      disabled,
      onChange,
      options
    } = this.props;
    const {fieldTouched, fieldError, errorClass} = errorValues(this.props);

    return (
      <div className={errorClass}>
        <label>{label}</label>
        <div className="form--button-group">
          <ButtonToolbar disabled={disabled}>
            <ToggleButtonGroup
              type="radio"
              name="options"
              onClick={field.onClick}
              onChange={val => {
                if (onChange) onChange(val);
                setFieldValue(field.name, val);
              }}
              defaultValue={defaultValue}
              value={(defaultValue || defaultValue === false) && field.value === '' ? defaultValue : field.value}
            >
              {options.map((opt, idx) => <ToggleButton variant="light" disabled={disabled} value={opt.value} key={idx}>{opt.name}</ToggleButton>)}
            </ToggleButtonGroup>
          </ButtonToolbar>
          {
            fieldTouched && fieldError &&
            <span className="has-error">{fieldError}</span>
          }
        </div>
      </div>
    );
  }
}
