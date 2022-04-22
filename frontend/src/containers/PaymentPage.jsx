import * as React from "react";
import {useState} from "react";
import NewPayment from "../components/NewPayment";

export default function PaymentPage(props) {
  if (props.user == null) {
    window.location = "/";
  }

  const [paymentInfo, setPaymentInfo] = useState({
    amount: 0,
    description: ""
  })

  return (
    <NewPayment paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}/>
  );
}