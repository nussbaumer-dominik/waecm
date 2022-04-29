import * as React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

export default function PaymentSuccess(props) {

  const handleNext = () => {
    props.setPaymentInfo({...props.paymentInfo, state: "qrCode"});
  }

  const handleError = () => {
    props.setPaymentInfo({...props.paymentInfo, state: "error"});
  }

  const navigateToNewPayment = () => {
    props.setPaymentInfo({...props.paymentInfo, state: "newPayment"});
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center">Zahlung erfolgreich durchgeführt</h2>

          <Button variant="success"
                  onClick={navigateToNewPayment}>

          </Button>

          <Button variant={"success"}
                  onClick={handleNext}>
            Zum vorherigen Screen
          </Button>

          <Button variant="danger"
                  onClick={handleError}>
            Zum Error Screen
          </Button>
        </Col>
      </Row>
    </Container>
  );
}