import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import AyncSuggestion from "../Formik/Fields/AsyncSuggestion";
import Text from "../Formik/Fields/Text";

const ValidationSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string()
    .length(5, "Zip is five characters")
    .required("Required")
});

export default class AsyncForm extends React.PureComponent {
  static initialValues = {
    address: "",
    city: "",
    state: "",
    zip: ""
  };

  render() {
    return (
      <Formik
        initialValues={AsyncForm.initialValues}
        onSubmit={values => alert(`Submitted: ${JSON.stringify(values)}`)}
        displayName={"Async"}
        enableReinitialize={true}
        validationSchema={ValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        render={({ handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Card>
                <Card.Body>
                  <h3>Formik Async/Auto-populate</h3>
                  <Row>
                    <Col>
                      <Field
                        name="address"
                        cityField="city"
                        stateField="state"
                        zipField="zip"
                        type="text"
                        component={AyncSuggestion}
                        label="Address"
                        maxLength={48}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field
                        name="city"
                        type="text"
                        placeholder="City"
                        component={Text}
                        label="City"
                      />
                    </Col>
                    <Col>
                      <Field
                        name="state"
                        type="text"
                        maxLength={2}
                        placeholder="State"
                        component={Text}
                        label="Zip"
                      />
                    </Col>
                    <Col>
                      <Field
                        name="zip"
                        type="text"
                        placeholder="Zip"
                        component={Text}
                        label="Zip"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button disabled={!isValid} type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </form>
        )}
      />
    );
  }
}
