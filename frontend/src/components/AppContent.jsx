import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

import {toast, ToastContainer} from "react-toastify";

import Buttons from "./Buttons";

export default class AppContent extends Component {
  constructor(props) {
    super(props);

    this.getHealth = () => {
      this.props.apiService.checkHealth().then(health => {
        toast.success('Api returned: ' + JSON.stringify(health));
      });
    };
  }

  componentDidMount() {
    if (this.props.state.user == null) {
      this.props.getUser();
    }
  }

  render() {
    return (<>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover/>

      <Buttons renewToken={this.props.renewToken}
               getHealth={this.getHealth}
               user={this.props.state.user}
      />
      {this.props.state.user == null &&
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
