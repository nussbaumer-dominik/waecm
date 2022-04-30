import * as React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function Settings({state, setSettings, api, addUser}) {
  if (state.user == null) {
    window.location = "/";
  }

  const handleKeyChange = event => {
    console.log("key pressed");
    if (event.target.value.length <= 30) {
      state.settings.apiKey = event.target.value;
      setSettings({...state.settings});
    }
  }

  const handleCurrencyChange = event => {
    state.settings.localCurrency = event.target.value;
    setSettings({...state.settings});
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (state.settings.apiKey !== "****") {
      api.changeApiKey(state.settings.apiKey);
    }

    api.changeCurrency(state.settings.localCurrency)
      .then(() => addUser());
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
                                value={state.settings.apiKey}
                                onChange={handleKeyChange}/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Lokale Währung</Form.Label>
                  <Form.Control as="select" value={state.settings.localCurrency}
                                onChange={handleCurrencyChange}>
                    <option value={""}>Keine</option>
                    {Object.entries(state.rates).map(([key, rateObject], index) => (
                      <option value={key.substring(3)} key={key}>{key.substring(3)}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="justify-self-center mt-3">
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
