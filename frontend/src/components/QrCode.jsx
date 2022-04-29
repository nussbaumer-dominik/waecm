import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {convertBTCtoSatoshi} from "../helpers/btcHelpers";
import QRCodeSVG from "qrcode.react";

export default function QrCode(props) {
  console.log(props)

  const handleNext = () => {
    props.setPaymentInfo({...props.paymentInfo, state: "success"});
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-center">
            <h2 className="text-center">{convertBTCtoSatoshi(props.rates, props.paymentInfo.amount)} SAT</h2>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <QRCodeSVG value={"https://www.spritkenig.com"} size={256}/>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <h3>
              {props.paymentInfo.description}
            </h3>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}