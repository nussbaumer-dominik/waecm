import * as React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {convertBTCtoSatoshi} from "../helpers/btcHelpers";

export default function NewPayment(props) {

  const handleAmountChange = event => {
    const parsedValue = parseFloat(event.target.value);
    if (parsedValue !== null && parsedValue !== undefined && !isNaN(parsedValue)) {
      props.setPaymentInfo({...props.paymentInfo, amount: parsedValue});
    } else {
      props.setPaymentInfo({...props.paymentInfo, amount: 0});
    }
  }

  const handleDescriptionChange = event => {
    if (event.target.value.length <= 30) {
      props.setPaymentInfo({...props.paymentInfo, description: event.target.value});
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (props.paymentInfo.amount === 0 || props.paymentInfo.amount === null || isNaN(props.paymentInfo.amount)) {
      alert("Der Betrag ist ein Pflichtfeld!");
      return;
    }

    const body = {
      amount: props.paymentInfo.amount,
      description: props.paymentInfo.description,
      currency: props.paymentInfo.currency
    };

    props.api.initiatePayment(JSON.stringify(body))
      .then(res => {
        console.log(res);
        props.paymentInfo.amount = res.data.data.amount;
        props.paymentInfo.payReq = res.data.data.lightning_invoice.payreq;
        props.paymentInfo.state = "qrCode";
        props.setPaymentInfo({...props.paymentInfo});
      });
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-8 col-md-10 col-sm-12">
          <Card>
            <Card.Header className="text-center">
              Neue Zahlung
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Betrag (in {props.paymentInfo.currency})</Form.Label>
                  <Form.Control type="text"
                                name="amount"
                                value={props.paymentInfo.amount}
                                onChange={handleAmountChange}/>
                  <Form.Text
                    className="text-muted float-right">{convertBTCtoSatoshi(props.rates, props.paymentInfo).toFixed(2)} SAT</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Beschreibung <span className="text-muted">(Optional)</span></Form.Label>
                  <Form.Control type="text"
                                name="description"
                                placeholder="Beschreibung"
                                maxLength="30"
                                value={props.paymentInfo.description}
                                onChange={handleDescriptionChange}/>
                  <Form.Text
                    className="text-muted float-right">Noch {30 - props.paymentInfo.description.length} Zeichen</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Bezahlen
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}