import * as React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {convertBTCtoSatoshi} from "../helpers/btcHelpers";
import QRCodeSVG from "qrcode.react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {toast} from "react-toastify";
import copy from "../copy.svg";

export default function QrCode({rates, paymentInfo, setPaymentInfo}) {

  const handleNext = () => {
    setPaymentInfo({...paymentInfo, state: "success"});
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-center">
            <h2 className="text-center">{convertBTCtoSatoshi(rates, paymentInfo)} SAT</h2>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <QRCodeSVG value={"https://www.spritkenig.com"} size={256}/>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <h3>
              {paymentInfo.description}
            </h3>
          </Row>
          <Row className="justify-content-center">
            <p className="text-muted m-0">
              {paymentInfo.description}
            </p>
            <CopyToClipboard text={paymentInfo.description}
            onCopy={() => toast.success("In die Zwischenablage kopiert.", {position: toast.POSITION.TOP_CENTER})}>
              <Button variant="outline-secondary">
                <img src={copy} alt="copy icon"/>
              </Button>
            </CopyToClipboard>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}