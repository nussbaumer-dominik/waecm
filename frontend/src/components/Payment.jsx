import * as React from "react";
import {Col, Row} from "react-bootstrap";

export default function Payment(props) {
  if (props.user == null) {
    window.location = "/";
  }

  return (
    <Row>
      <Col>
        <h2 className="text-center">Payment Komponente</h2>
      </Col>
    </Row>
  );
}