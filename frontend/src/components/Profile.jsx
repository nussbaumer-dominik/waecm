import * as React from "react";
import { Row, Col } from "react-bootstrap";

export default function Profile(props) {
    if (props.user == null) {
        window.location = "/";
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Col va>
                    <img src={props.user.profile.picture} alt="avatar" width="128" height="128" className="rounded-circle" />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Userinfo</h5>
                            <dl className="row">
                                <dt className="col-sm-2">access_token</dt>
                                <dd className="col-sm-10">
                                    {props.user.access_token}
                                </dd>

                                <dt className="col-sm-2">refresh_token</dt>
                                <dd className="col-sm-10">
                                    {props.user.refresh_token}
                                </dd>

                                <dt className="col-sm-2">sub</dt>
                                <dd className="col-sm-10">
                                    {props.user.profile.sub}
                                </dd>

                                <dt className="col-sm-2">email verified</dt>
                                <dd className="col-sm-10">
                                    {props.user.profile.email_verified ? "yes" : "no"}
                                </dd>

                                <dt className="col-sm-2">name</dt>
                                <dd className="col-sm-10">
                                    {props.user.profile.name}
                                </dd>

                                <dt className="col-sm-2">preferred_username</dt>
                                <dd className="col-sm-10">
                                    {props.user.profile.preferred_username}
                                </dd>

                                <dt className="col-sm-2">given_name</dt>
                                <dd className="col-sm-10">
                                    {props.user.profile.given_name}
                                </dd>

                                <dt className="col-sm-2">family_name</dt>
                                <dd className="col-sm-10">
                                    {props.user.profile.family_name}
                                </dd>
                            </dl>
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
    );
}
