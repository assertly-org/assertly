import React, { useState } from "react";
import { errorValues } from "./utils";

const results = [
  { street: "1 Main St.", city: "Cary", state: "NC", zip: "27616" },
  { street: "500 Glenwood Ave.", city: "Raleigh", state: "NC", zip: "27511" },
  { street: "200 E Ave", city: "Apex", state: "NC", zip: "27616" }
];

class LocationApi {
  searchAddresses(query) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(results);
      }, Math.floor(Math.random() * 5000 + 500));
    });
  }
}

const api = new LocationApi();

const FormattedAdress = ({ address }) => {
  const formatted = Object.values(address).join(" ");
  return formatted;
};

export default props => {
  const [addresses, setAddresses] = useState([]);
  const [hasFocus, setHasFocus] = useState(false);

  const { fieldTouched, fieldError, errorClass } = errorValues(props);
  const {
    cityField,
    stateField,
    zipField,
    label,
    min,
    placeholder,
    defaultValue,
    maxLength,
    disabled,
    field,
    form: { setFieldValue }
  } = props;

  const handleChange = async evt => {
    const { value } = evt.target;
    setFieldValue(field.name, value);
    const result = await api.searchAddresses(evt.target.value);
    setAddresses(result);
  };

  const findAddress = ({ street, city, state, zip }) => {
    setFieldValue(field.name, street);
    setAddresses([]);

    setFieldValue(cityField, city);
    setFieldValue(stateField, state);
    setFieldValue(zipField, zip);
  };

  return (
    <div className={errorClass}>
      <label>{label}</label>
      <div>
        <div className="autocomplete">
          <input
            {...field}
            defaultValue={defaultValue}
            type="text"
            maxLength={maxLength}
            min={min}
            disabled={disabled}
            onChange={handleChange}
            value={field.value || ""}
            placeholder={placeholder ? placeholder : label}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className="form-control"
          />
          {hasFocus && field.value && addresses && addresses.length > 0 && (
            <div
              className="autocomplete-items"
              onMouseDown={evt => evt.preventDefault()}
            >
              {addresses.map((address, key) => (
                <div key={key} onClick={() => findAddress(address)}>
                  <strong>{field.value}</strong>{" "}
                  <FormattedAdress address={address} />
                </div>
              ))}
            </div>
          )}
          <div>
            {fieldTouched && fieldError && (
              <span className="has-error">{fieldError}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
