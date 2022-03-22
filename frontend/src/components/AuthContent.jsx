import * as React from "react";

export default class AuthContent extends React.Component {
  render() {
    if (this.props.user && this.props.user.profile) {
      return (
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title">Userinfo</h5>
            <dl className="row">
              <dt className="col-sm-2">access_token</dt>
              <dd className="col-sm-10">
                {this.props.user.access_token}
              </dd>

              <dt className="col-sm-2">refresh_token</dt>
              <dd className="col-sm-10">
                {this.props.user.refresh_token}
              </dd>

              <dt className="col-sm-2">sub</dt>
              <dd className="col-sm-10">
                {this.props.user.profile.sub}
              </dd>

              <dt className="col-sm-2">email verified</dt>
              <dd className="col-sm-10">
                {this.props.user.profile.email_verified ? "yes" : "no"}
              </dd>

              <dt className="col-sm-2">name</dt>
              <dd className="col-sm-10">
                {this.props.user.profile.name}
              </dd>

              <dt className="col-sm-2">preferred_username</dt>
              <dd className="col-sm-10">
                {this.props.user.profile.preferred_username}
              </dd>

              <dt className="col-sm-2">given_name</dt>
              <dd className="col-sm-10">
                {this.props.user.profile.given_name}
              </dd>

              <dt className="col-sm-2">family_name</dt>
              <dd className="col-sm-10">
                {this.props.user.profile.family_name}
              </dd>

              <dt className="col-sm-2">picture</dt>
              <dd className="col-sm-10">
                <img src={this.props.user.profile.picture} alt=""/>
              </dd>

            </dl>
          </div>
        </div>
      );
    } else {
      return <div>You are not logged in!</div>
    }

  }
}
