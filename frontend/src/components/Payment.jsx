import * as React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

export default function Payment(props) {
  if (props.user == null) {
    window.location = "/";
  }

  return (
    <Row className="justify-content-center">
      <Col className="col-6">
        <Card>
          <Card.Header className="text-center">
            Neue Zahlung
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Betrag</Form.Label>
                <Form.Control type="number" placeholder="€ Betrag" />
                <Form.Text className="text-muted float-right">X SAT</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Beschreibung (Optional)</Form.Label>
                <Form.Control type="text" placeholder="Beschreibung" />
                <Form.Text className="text-muted float-right">Noch 30 Zeichen</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}