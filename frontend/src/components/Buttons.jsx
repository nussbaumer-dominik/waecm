import * as React from "react";
import {Button} from "primereact/button";

export default function Buttons(props) {
  return (
    <div className="flex justify-content-center">
      {props.user != null &&
        <div className="lg:col-6 flex lg:flex-row flex-column justify-content-around" style={{marginTop: "30px", gap: "15px"}}>
          <Button label="Get history" onClick={props.getHistory}/>
          <Button label="Get Health" onClick={props.getHealth}/>
          <Button label="Renew Token" onClick={props.renewToken}/>
        </div>
      }
    </div>
  );
}
