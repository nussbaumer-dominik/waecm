import React from "react";

export default function DataRights(props) {
    if (props.user == null) {
    window.location = "/";
}
    return (<>
        <h1>Datenschutz-Richtlinie</h1>
    </>);
}
