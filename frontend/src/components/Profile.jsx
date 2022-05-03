import * as React from "react";
import {Avatar} from "primereact/avatar";

export default function Profile(props) {

  if (props.user === null || Object.keys(props.user).length === 0) {
    window.location = "/";
  }

  return (
    <div className="mx-6 flex">
      <div className="justify-content-center">
        <div className="md:col-6">
          <div className="profile d-flex align-items-center flex-column">
            <Avatar image={props.user.profile.picture} alt="avatar" size="xlarge" shape="circle"/>
            <div className="name">
              <h3 className="title mb-0">{props.user.profile.name}</h3>
              <span className="username text-muted">@{props.user.profile.preferred_username}</span>
            </div>
          </div>
        </div>
        <div className="col">
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
        </div>
      </div>
    </div>
  );
}







