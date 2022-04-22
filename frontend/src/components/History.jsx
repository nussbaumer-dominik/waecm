import * as React from "react";
import { Col, Row } from "react-bootstrap";

export default function History(props) {

  if (props.user == null) {
    window.location = "/";
  }

  return (
    <Row>
      <Col>
        <h2 className="text-center">History Komponente</h2>
      </Col>
    </Row>
  );
}