import * as React from "react";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

export default function PaymentSuccess(props) {

  const handleError = () => {
    props.setPaymentInfo({...props.paymentInfo, state: "error"});
  }

  const navigateToNewPayment = () => {
    props.paymentInfo.amount = "";
    props.paymentInfo.description = "";
    props.paymentInfo.payReq = "";
    props.paymentInfo.chargeId = "";
    props.setPaymentInfo({...props.paymentInfo, state: "newPayment"});
  }

  return (
    <div className="mx-6">
      <div className="flex flex-column justify-content-center" style={{gap: "20px"}}>
        <h2 className="text-center">Zahlung erfolgreich durchgeführt</h2>

        <div className="flex justify-content-center">
          <i className="pi pi-check-circle text-green-500 mr-2" style={{fontSize: "200px"}}/>
        </div>

        <Button label="Neue Zahlung" onClick={navigateToNewPayment}/>

        <Link to="../history">
          Zur Historie
        </Link>
      </div>
    </div>
  );
}