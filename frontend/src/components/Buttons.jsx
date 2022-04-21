import * as React from "react";

export default function Buttons(props) {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{marginTop: "30px"}}>
        <button className="btn btn-warning" style={{margin: "10px"}} onClick={props.getHistory}>
          Get History
        </button>
        <button className="btn btn-success" style={{margin: "10px"}} onClick={props.renewToken}>
          Renew Token
        </button>
      </div>
    </div>
  );
};
