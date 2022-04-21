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

    this.getHistory = async () => {
      try {
        const res = await this.apiService.getHistory();
        let data = await res.json();
        this.setState({history: data.data});
        toast.success('Api returned: ' + data.data);
      } catch (e) {
        toast.error(e);
      }
    }

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

      <Buttons renewToken={this.renewToken}
               />

      <AuthContent api={this.state.api}
                   user={this.state.user}/>
    </>);
  }
}
