import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Checkbox from "../Formik/Fields/Checkbox";
import File from "../Formik/Fields/File";
import ErrorMessage from "../Formik/Fields/ErrorMessage";
import Radio from "../Formik/Fields/Radio";
import Text from "../Formik/Fields/Text";
import Phone from "../Formik/Fields/Phone";
import Select from "../Formik/Fields/Select";
import ToggleButton from "../Formik/Fields/ToggleButton";

const ValidationSchema = Yup.object().shape({
  textField: Yup.string().required("Required"),
  radioField: Yup.number().required("Required"),
  selectField: Yup.string().required("Required"),
  checkboxField: Yup.number().required("Required"),
  toggleButton: Yup.bool().required("Required"),
  phoneField: Yup.string()
    .matches(/(^[0-9]+$)/, "Only digits here")
    .required("Required")
    .min(10)
    .max(10)
});

const options = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "golang", label: "Go" }
];

export default class BasicForm extends React.PureComponent {
  static initialValues = {
    checkboxField: "",
    phoneField: "",
    radioField: "",
    selectField: "",
    textField: ""
  };

  render() {
    return (
      <Formik
        initialValues={BasicForm.initialValues}
        onSubmit={values => alert(`Submitted: ${JSON.stringify(values)}`)}
        displayName={"OrderForm"}
        enableReinitialize={true}
        validationSchema={ValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        render={({ handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Card>
                <Card.Body>
                  <h3>Formik Basic</h3>
                  <Row>
                    <Col>
                      <Field
                        name="textField"
                        type="text"
                        placeholder="placeholder"
                        component={Text}
                        label="Text Field"
                      />
                    </Col>
                    <Col>
                      <Field
                        name="radioField"
                        type="radio"
                        value={1}
                        component={Radio}
                        label="Value 1"
                      />{" "}
                      <Field
                        name="radioField"
                        type="radio"
                        value={2}
                        component={Radio}
                        label="Value 2"
                      />
                      <ErrorMessage name="radioField" />
                    </Col>
                    <Col>
                      <Field
                        name="checkboxField1"
                        type="checkbox"
                        value={1}
                        component={Checkbox}
                        label="Value 1"
                      />{" "}
                      <Field
                        name="checkboxField2"
                        type="checkbox"
                        value={2}
                        component={Checkbox}
                        label="Value 2"
                      />
                      <Field
                        name="checkboxField3"
                        type="checkbox"
                        value={3}
                        component={Checkbox}
                        label="Value 3"
                      />
                      <ErrorMessage name="checkboxField" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field
                        name="phoneField"
                        type="checkbox"
                        component={Phone}
                        label="Phone"
                      />
                    </Col>
                    <Col>
                      <Field
                        name="toggleButton"
                        defaultValue={false}
                        component={ToggleButton}
                        label="Yes or No?"
                        options={[
                          { name: "Yes", value: true },
                          { name: "No", value: false }
                        ]}
                      />
                    </Col>
                    <Col>
                      <Field
                        label="Select"
                        name="selectField"
                        options={options}
                        component={Select}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="File Upload" name="file" component={File} />
                    </Col>
                  </Row>

                  <Button disabled={!isValid} type="submit">
                    Submit
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </form>
        )}
      />
    );
  }
}
