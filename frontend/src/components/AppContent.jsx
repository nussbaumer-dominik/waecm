import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { toast, ToastContainer } from "react-toastify";
import { ApiService } from "../services/ApiService";
import { AuthService } from "../services/AuthService";

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
        this.setState({ history: data.data });
        toast.success('Api returned: ' + data.data);
      } catch (e) {
        toast.error(e);
      }
    }

    this.getUser = () => {
      this.authService.getUser().then(user => {
        if (!this.shouldCancel) {
          this.setState({ user });
        }
      });
    };

    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.state = { user: {}, api: {} };
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
      <ToastContainer />

      <Buttons renewToken={this.renewToken}
        user={this.state.user}
      />
      {this.state.user == null &&
        <Container>
          <Row>
            <Col className="text-center">
              Sie sind nicht eingeloggt!
            </Col>
          </Row>
        </Container>
      }
    </>);
  }
}
