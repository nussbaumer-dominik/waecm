import * as React from "react";

export default function Buttons(props) {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: "30px" }}>
        {props.user != null &&
          <button className="btn btn-warning" style={{ margin: "10px" }} onClick={props.getHistory}>
            Get History
          </button>
        }

        {props.user != null &&
          <button className="btn btn-warning" style={{ margin: "10px" }} onClick={props.getHealth}>
            Get Health
          </button>
        }

        {props.user != null &&
          <button className="btn btn-success" style={{ margin: "10px" }} onClick={props.renewToken}>
            Renew Token
          </button>
        }
      </div>
    </div>
  );
};
