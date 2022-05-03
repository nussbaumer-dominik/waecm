import * as React from "react";
import {convertBTCtoSatoshi} from "../helpers/btcHelpers";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export default function NewPayment(props) {

  const handleAmountChange = event => {
    const parsedValue = parseFloat(event.target.value);
    if (parsedValue !== null && parsedValue !== undefined && !isNaN(parsedValue)) {
      props.setPaymentInfo({...props.paymentInfo, amount: parsedValue});
    } else {
      props.setPaymentInfo({...props.paymentInfo, amount: 0});
    }
  }

  const handleDescriptionChange = event => {
    if (event.target.value.length <= 30) {
      props.setPaymentInfo({...props.paymentInfo, description: event.target.value});
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (props.paymentInfo.amount === 0 || props.paymentInfo.amount === null || isNaN(props.paymentInfo.amount)) {
      alert("Der Betrag ist ein Pflichtfeld!");
      return;
    }

    const body = {
      amount: props.paymentInfo.amount,
      description: props.paymentInfo.description,
      currency: props.paymentInfo.currency
    };

    props.api.initiatePayment(JSON.stringify(body))
      .then(res => {
        console.log(res);
        const fee = convertBTCtoSatoshi(props.rates, props.paymentInfo) - res.data.data.amount;
        props.paymentInfo.fee = fee;
        props.paymentInfo.chargeId = res.data.data.id;
        props.paymentInfo.amount = res.data.data.amount - fee;
        // Amount is now in SATs
        props.paymentInfo.payReq = res.data.data.lightning_invoice.payreq;
        props.paymentInfo.state = "qrCode";
        props.setPaymentInfo({...props.paymentInfo});
      });
  }

  return (
    <div className="col flex justify-content-center">
      <div className="md:w-6 sm:w-full p-3 border border-round">
        <h2 className="text-center">Neue Zahlung</h2>
        <div className="field">
          <label htmlFor="amount">Betrag</label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
                {props.paymentInfo.currency}
            </span>

            <InputText id="amount"
                       className="p-inputtext inputfield w-full"
                       value={props.paymentInfo.amount}
                       onChange={handleAmountChange}/>
          </div>
        </div>

        <div className="field">
          <label htmlFor="key">Beschreibung (Optional)</label>
          <InputText id="key"
                     maxLength="30"
                     className="p-inputtext inputfield w-full"
                     value={props.paymentInfo.description}
                     onChange={handleDescriptionChange}/>
        </div>
        <Button label="Bezahlen" onClick={handleSubmit}/>
      </div>
    </div>
  );
}