import * as React from "react";
import {useEffect, useState} from "react";
import NewPayment from "../components/NewPayment";
import QrCode from "../components/QrCode";
import PaymentSuccess from "../components/PaymentSuccess";
import {Message} from "primereact/message";

export default function PaymentPage(props) {
  if (props.state.user == null) {
    window.location = "/";
  }

  const [paymentInfo, setPaymentInfo] = useState({
    amount: "",
    fee: "",
    description: "",
    currency: "",
    state: "newPayment",
    payReq: "",
    id: "",
  })

  useEffect(() => {
    setPaymentInfo({...paymentInfo, currency: props.state.dbUser?.localCurrency})
  }, [props.state.dbUser, setPaymentInfo]);

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
                api={props.api}/>
      );
    case "success":
      return (
        <PaymentSuccess paymentInfo={paymentInfo}
                        setPaymentInfo={setPaymentInfo}/>
      );
    default:
      return (<Message severity="error" text="Error"/>);
  }
}