import * as React from "react";
import QRCodeSVG from "qrcode.react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {toast, ToastContainer} from "react-toastify";
import copy from "../copy.svg";
import {useEffect} from "react";
import {Button} from "primereact/button";
import {Chip} from "primereact/chip";

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
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-content-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover/>

      <div className="flex flex-column justify-content-center">
        <div className="flex flex-column justtify-content-center align-items-center mb-3">
          <h2 className="text-center mb-0">{new Intl.NumberFormat("de-DE", {style: "currency", currency: "SAT"}).format(paymentInfo.amount)}</h2>
          <Chip label={new Intl.NumberFormat("de-DE", {style: "currency", currency: "SAT"}).format(paymentInfo.fee) + " Gebühren"}/>
        </div>
        <QRCodeSVG value={paymentInfo.payReq} size={256} style={{}}/>
        <p className="text-center">
          {paymentInfo.description}
        </p>
        <div className="flex flex-column align-items-center">
          <p className="text-muted" style={payreqStyle}>
            {paymentInfo.payReq}
          </p>
          <CopyToClipboard text={paymentInfo.payReq}
                           onCopy={() => toast.success("In die Zwischenablage kopiert.", {position: toast.POSITION.TOP_CENTER})}>
            <Button>
              <img src={copy} alt="copy icon"/>
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

const payreqStyle = {
  color: "#212529",
  maxWidth: "300px",
  textOverflow: "ellipsis",
  overflowX: "hidden",
  height: "fit-content",
}