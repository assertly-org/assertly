import {getIn} from 'formik';

export const required = value => {
  return (value || value === false) && typeof value !== undefined ? undefined : 'Required';
};

export const stateClassName = ({touched, error, submitFailed}) => {
  if ((touched || submitFailed) && error) return 'has-error';
  return null;
};

export const composeValidators = validators => value => {
  for (const validator of validators) {
    const error = validator(value);

    if (error) {
      return error;
    }
  }

  return undefined;
};

export const getFieldValue = (values, name) => getIn(values, name);

export const hasDisabledStatus = (status, name) => status && status.disabled && Array.isArray(status.disabled)
  ? status.disabled.includes(name)
  : false;

export const errorValues = ({field, form: {touched, errors}}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldError = getIn(errors, field.name);
  const errorClass = stateClassName({touched: fieldTouched, error: fieldError});
  return {fieldTouched, fieldError, errorClass};
};
