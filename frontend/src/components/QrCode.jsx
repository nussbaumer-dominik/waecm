import * as React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import QRCodeSVG from "qrcode.react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {toast, ToastContainer} from "react-toastify";
import copy from "../copy.svg";
import {useEffect} from "react";

export default function QrCode({paymentInfo, setPaymentInfo, api}) {

  const handleNext = () => {
    setPaymentInfo({...paymentInfo, state: "success"});
  }

  useEffect(() => {
    const interval = setInterval(() => {
      api.getChargeInfo(paymentInfo.chargeId)
        .then(res => {
          console.log(res);
          if (res.data.status === "paid") handleNext();
        });
    },2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover/>
      <Row>
        <Col>
          <Row className="justify-content-center">
            <div>
              <h2 className="text-center mb-0">{paymentInfo.amount} SAT</h2>
              <span className="badge badge-danger w-100">{paymentInfo.fee} SAT Gebühren</span>
            </div>
          </Row>
          <Row>

          </Row>
          <Row className="mt-4">
            <Col className="d-flex justify-content-center">
              <QRCodeSVG value={"https://www.spritkenig.com"} size={256}/>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col className="col-10">
              <p>
                {paymentInfo.description}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center mt-4">
            <div className="text-muted m-0" style={payreqStyle}>
              {paymentInfo.payReq}
            </div>
            <CopyToClipboard text={paymentInfo.payReq}
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

const payreqStyle = {
  color: "#212529",
  maxWidth: "300px",
  textOverflow: "ellipsis",
  overflowX: "hidden",
  height: "fit-content",
}