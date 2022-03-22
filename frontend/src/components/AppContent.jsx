import React, {Component} from "react";

import {toast, ToastContainer} from "react-toastify";
import {ApiService} from "../services/ApiService";
import {AuthService} from "../services/AuthService";

import AuthContent from "./AuthContent";
import Buttons from "./Buttons";

export default class AppContent extends Component {
  constructor(props) {
    super(props);

    this.login = async () => {
      await this.authService.login();
    };

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

    this.logout = async () => {
      await this.authService.logout();
    };

    this.getUser = () => {
      this.authService.getUser().then(user => {
        if (user) {
          toast.success("User has been successfully loaded from store.");
        } else {
          toast.info("You are not logged in.");
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

      <Buttons login={this.login}
               logout={this.logout}
               renewToken={this.renewToken}
               getUser={this.getUser}/>

      <AuthContent api={this.state.api}
                   user={this.state.user}/>
    </>);
  }
}
