import * as React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

export default function NewPayment({paymentInfo, setPaymentInfo}) {
  function convertBTCtoSatoshi(amount) {
    return amount / 100000000;
  }

  const handleAmountChange = event => {
    setPaymentInfo({...paymentInfo, amount: parseFloat(event.target.value)});
  }

  const handleDescriptionChange = event => {
    if (event.target.value.length <= 30) {
      setPaymentInfo({...paymentInfo, description: event.target.value});
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(paymentInfo);
    if (paymentInfo.amount === 0 || paymentInfo.amount == null) {
      console.error("Der Betrag ist ein Pflichtfeld!")
      alert("Der Betrag ist ein Pflichtfeld!");
      return;
    } else {
      alert(JSON.stringify(paymentInfo));
    }
  }

  return (
    <Row className="justify-content-center">
      <Col className="col-6">
        <Card>
          <Card.Header className="text-center">
            Neue Zahlung
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Betrag (in €)</Form.Label>
                <Form.Control type="number"
                              name="amount"
                              placeholder="€ Betrag"
                              value={paymentInfo.amount}
                              onChange={handleAmountChange}/>
                <Form.Text
                  className="text-muted float-right">{convertBTCtoSatoshi(paymentInfo.amount)} SAT</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Beschreibung <span className="text-muted">(Optional)</span></Form.Label>
                <Form.Control type="text"
                              name="description"
                              placeholder="Beschreibung"
                              maxLength="30"
                              value={paymentInfo.description}
                              onChange={handleDescriptionChange}/>
                <Form.Text
                  className="text-muted float-right">Noch {30 - paymentInfo.description.length} Zeichen</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Bezahlen
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}