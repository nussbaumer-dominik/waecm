import * as React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";

export default function Settings(props) {
  if (props.user == null) {
    window.location = "/";
  }

  const [settings, setSettings] = useState({
    apiKey: "",
    localCurrency: null,
  })

  const handleKeyChange = event => {
    if (event.target.value.length <= 30) {
      props.setSettings({...settings, apiKey: event.target.value});
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: do something
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-8 col-md-10 col-sm-12">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Opennode Api-Key</Form.Label>
                  <Form.Control type="text"
                                name="apiKey"
                                maxLength="30"
                                value={settings.apiKey}
                                onChange={handleKeyChange}/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Lokale Währung</Form.Label>
                  <Form.Select>
                    {Object.entries(props.rates).map(([key, rateObject], index) => (
                      <option value={key.substring(3)} key={key}>{key.substring(3)}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="justify-self-center">
                  Speichern
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}