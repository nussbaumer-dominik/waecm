import * as React from 'react';

export default class AuthContent extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          {this.props.user && JSON.stringify(this.props.user.profile)}
        </div>
      </div>
    );
  }
}
