import * as React from "react";

export default function Settings(props) {

  if (props.user == null) {
    window.location = "/";
  }

  return (
    <div className="row">
      <div className="col">
        <h2 className="text-center">Settings Komponente</h2>
      </div>
    </div>
  );
}