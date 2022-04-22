import * as React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

export default function QrCode(props) {

  const handleNext = () => {
    props.setPaymentInfo({...props.paymentInfo, state: "success"});
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center">QrCode Komponente</h2>
          <Button variant={"success"}
                  onClick={handleNext}>
            Zum nächsten Screen
          </Button>
        </Col>
      </Row>
    </Container>
  );
}