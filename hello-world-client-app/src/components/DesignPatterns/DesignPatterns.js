import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Checkbox from "./Hoc/Checkbox";
import Radio from "./Hoc/Radio";
import ShInput from "./StateHoisting/Input";
import RpInput from "./RenderProps/Input";
import { BlueButton, RedButton } from "./Styled/Styled";

export default class Design extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.title = "Design Patterns";
  }

  render() {
    return (
      <>
        <h1>Design Patterns</h1>
        <Row>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <label>HOC Checkbox</label>
                  <div>
                    <label className="checkbox-inline">
                      <Checkbox placeholder="hoc" value={1} name="checkbox" />
                      Value 1
                    </label>{" "}
                    <label className="checkbox-inline">
                      <Checkbox
                        placeholder="hoc"
                        value={2}
                        name="checkbox-hoc"
                      />
                      Value 2
                    </label>
                  </div>
                </Col>
                <Col>
                  <label>HOC Radio</label>
                  <div>
                    <label className="radio-inline">
                      <Radio placeholder="hoc" value={1} name="radio-hoc" />
                      Value 1
                    </label>{" "}
                    <label className="radio-inline">
                      <Radio placeholder="hoc" value={2} name="radio-hoc" />
                      Value 2
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>State Hoisting Text Input</label>
                  <div>
                    <label />
                    <ShInput type="text" name="state-hoisting-text" />
                  </div>
                </Col>
                <Col>
                  <RpInput
                    label="Render Props Select"
                    render={options => (
                      <select name="language">
                        {options.map(({ value, label }, key) => (
                          <option key={key} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>Styled Components Blue Button</div>
                  <BlueButton type="button">Blue Button</BlueButton>
                </Col>
                <Col>
                  <div>Styled Components Red Button</div>
                  <RedButton type="button">Red Button</RedButton>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Uncontrolled Input</label>

                  <input type="text" name="uncontrolled-text" />
                </Col>
                <Col>
                  <label>Uncontrolled Checkbox</label>
                  <div>
                    <input type="checkbox" value={1} name="uncontrolled-text" />{" "}
                    Value 1
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Ref Input</label>
                  <div>
                    <input type="text" name="ref-text" ref={this.inputRef} />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </>
    );
  }
}
