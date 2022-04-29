import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import AppContent from "../components/AppContent";
import {ApiService} from "../services/ApiService";
import {AuthService} from "../services/AuthService";
import Header from "../components/Header";
import logo from "../logo.svg";
import "./App.css";
import PaymentPage from "./PaymentPage";
import History from "../components/History";
import Settings from "../components/Settings";
import {toast} from "react-toastify";
import {Col, Container, Row} from "react-bootstrap";
import Profile from "../components/Profile";

class App extends Component {

  constructor(props) {
    super(props);

    this.login = async () => {
      await this.authService.login();
    };

    this.renewToken = () => {
      this.authService
        .renewToken()
        .then(user => {
          toast.success("Token has been successfully renewed.");
          this.getUser();
        })
        .catch(error => {
          toast.error(error);
        });
    };

    this.addUser = async (token) => {
      try {
        const res = await this.apiService.addUser(token);
        this.setState({dbUser: res});
        toast.success('Api returned: ' + JSON.stringify(res.data));
      } catch (e) {
        toast.error(e);
      }
    }

    this.logout = async () => {
      await this.authService.logout();
    };

    this.initiatePayment = async () => {
      try {
        const res = await this.apiService.initiatePayment();
        let data = await res.json();
        this.setState({payment: data.data});
        toast.success('Api returned: ' + data.data);
      } catch (e) {
        toast.error(e);
      }
    }

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
          toast.success("User has been loaded from store.");
        } else {
          toast.info("You are not logged in.");
        }
        this.setState({user});
      });
    };

    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.state = {
      user: {},
      api: {},
      dbUser: {},
      history: {},
      settings: {}
    };
  }

  componentDidMount() {
    this.authService.getUser().then(user => {
      if (user) {
        toast.success("User has been loaded from store.");
        this.addUser(user.access_token);
      } else {
        toast.info("You are not logged in.");
      }
      this.setState({user});
    });
  }

  render() {
    return (
      <div className="App">
        <Header pageTitle="Bsp 2 Gruppe 08"
                logoSrc={logo}
                login={this.login}
                logout={this.logout}
                user={this.state.user}/>
        <Container fluid>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<AppContent apiService={this.apiService}
                                                     getUser={this.getUser}
                                                     renewToken={this.renewToken}
                                                     state={this.state}
                                                     setState={this.setState}/>}/>
                <Route path="/payment" element={<PaymentPage user={this.state.user}
                                                             api={this.apiService}/>}/>
                <Route path="/history" element={<History user={this.state.user}
                                                         api={this.apiService}/>}/>
                <Route path="/settings" element={<Settings user={this.state.user}
                                                           api={this.apiService}/>}/>
                <Route path="/profile" element={<Profile user={this.state.user}
                                                         getUser={this.getUser}/>}/>
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
