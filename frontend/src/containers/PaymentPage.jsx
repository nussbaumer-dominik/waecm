import * as React from "react";
import {useEffect, useState} from "react";
import NewPayment from "../components/NewPayment";
import QrCode from "../components/QrCode";
import PaymentSuccess from "../components/PaymentSuccess";
import {Alert} from "react-bootstrap";

export default function PaymentPage(props) {
  if (props.state.user == null) {
    window.location = "/";
  }

  const [paymentInfo, setPaymentInfo] = useState({
    amount: "",
    description: "",
    currency: "",
    state: "newPayment",
    payReq: ""
  })

  useEffect(() => {
    setPaymentInfo({...paymentInfo, currency: props.state.dbUser.localCurrency})
  });

  switch (paymentInfo.state) {
    case "newPayment":
      return (
        <NewPayment paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    api={props.api}
                    rates={props.state.rates}/>
      );
    case "qrCode":
      return (
        <QrCode paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                rates={props.state.rates}/>
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