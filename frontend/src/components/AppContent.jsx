import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

import {ToastContainer} from "react-toastify";

import Buttons from "./Buttons";

export default class AppContent extends Component {
  constructor(props) {
    super(props);

    this.getHealth = () => {
      this.props.apiService.checkHealth().then(health => {
        console.log(health);
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
      <ToastContainer/>

      <Buttons renewToken={this.props.renewToken}
               getHealth={this.getHealth}
               addUser={this.props.addUser}
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
