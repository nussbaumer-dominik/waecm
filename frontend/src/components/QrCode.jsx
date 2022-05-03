import * as React from "react";
import QRCodeSVG from "qrcode.react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {toast, ToastContainer} from "react-toastify";
import copy from "../copy.svg";
import {useEffect} from "react";
import {Button} from "primereact/button";

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

      <div>
        <div>
          <h2 className="text-center mb-0">{paymentInfo.amount} SAT</h2>
          <span className="badge badge-danger w-100">{paymentInfo.fee} SAT Gebühren</span>
        </div>
        <QRCodeSVG value={paymentInfo.payReq} size={256}/>
        <p>
          {paymentInfo.description}
        </p>
        <div className="text-muted m-0" style={payreqStyle}>
          {paymentInfo.payReq}
        </div>
        <CopyToClipboard text={paymentInfo.payReq}
                         onCopy={() => toast.success("In die Zwischenablage kopiert.", {position: toast.POSITION.TOP_CENTER})}>
          <Button>
            <img src={copy} alt="copy icon"/>
          </Button>
        </CopyToClipboard>
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