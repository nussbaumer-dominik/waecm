import * as React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function PaymentSuccess(props) {

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

          <div>
            <i className="pi pi-check-circle text-green-500 mr-2" />
          </div>

          <Button variant="success"
                  onClick={navigateToNewPayment}>
            Neue Zahlung
          </Button>

          <Link to="history">
            Zur Historie
          </Link>
        </Col>
      </Row>
    </Container>
  );
}