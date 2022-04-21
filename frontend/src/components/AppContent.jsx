import React, {Component} from "react";

import {toast, ToastContainer} from "react-toastify";
import {ApiService} from "../services/ApiService";
import {AuthService} from "../services/AuthService";

import AuthContent from "./AuthContent";
import Buttons from "./Buttons";

export default class AppContent extends Component {
  constructor(props) {
    super(props);

    this.renewToken = () => {
      this.authService
        .renewToken()
        .then(user => {
          toast.success("Token has been successfully renewed. :-)");
          this.getUser();
        })
        .catch(error => {
          toast.error(error);
        });
    };

    this.callApi = () => {
      this.apiService
        .callApi()
        .then(data => {
          this.setState({ api: data.data });
          toast.success('Api returned: ' + data.data);
        })
        .catch(error => {
          toast.error(error);
        });
    };

    this.getUser = () => {
      this.authService.getUser().then(user => {
        if (user) {
          //toast.success("User has been successfully loaded from store.");
        } else {
          //toast.info("You are not logged in.");
        }
        if (!this.shouldCancel) {
          this.setState({user});
        }
      });
    };
    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.state = {user: {}, api: {}};
    this.shouldCancel = false;
  }

  componentDidMount() {
    this.getUser();
  }

  componentWillUnmount() {
    this.shouldCancel = true;
  }

  render() {
    return (<>
      <ToastContainer/>

      <Buttons callApi={this.callApi}
               renewToken={this.renewToken}
               getUser={this.getUser}/>

      <AuthContent api={this.state.api}
                   user={this.state.user}/>
    </>);
  }
}
