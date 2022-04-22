import * as React from "react";
import {useState} from "react";
import NewPayment from "../components/NewPayment";
import QrCode from "../components/QrCode";
import PaymentSuccess from "../components/PaymentSuccess";
import {Alert} from "react-bootstrap";

export default function PaymentPage(props) {
  if (props.user == null) {
    window.location = "/";
  }

  const [paymentInfo, setPaymentInfo] = useState({
    amount: 0,
    description: "",
    state: "newPayment"
  })

  switch (paymentInfo.state) {
    case "newPayment":
      return (
        <NewPayment paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}/>
      );
    case "qrCode":
      return (
        <QrCode paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}/>
      );
    case "success":
      return (
        <PaymentSuccess paymentInfo={paymentInfo}
                        setPaymentInfo={setPaymentInfo}/>
      );
    default:
      return (<Alert variant="danger">Error</Alert>);
  }
}