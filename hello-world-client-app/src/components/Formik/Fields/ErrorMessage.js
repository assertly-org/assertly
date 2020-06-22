import React from "react";
import { ErrorMessage } from "formik";

export default function({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={msg => <span className="has-error">{msg}</span>}
    />
  );
}
