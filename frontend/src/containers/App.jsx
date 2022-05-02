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
import axios from "axios";
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import PaymentSuccess from "../components/PaymentSuccess";

class App extends Component {

  constructor(props) {
    super(props);

    this.login = async () => {
      await this.authService.login();
    };

    this.renewToken = () => {
      this.authService
        .renewToken()
        .then(() => {
          toast.success("Token has been successfully renewed.");
          this.getUser();
          this.addUser();
        })
        .catch(error => {
          toast.error(error);
        });
    };

    this.addUser = () => {
      try {
        this.apiService.addUser()
          .then(res => {
            if (res != null) {
              this.setState({dbUser: res.data});
              const settings = {
                apiKey: res.data.apiKeyStored ? "****" : "",
                localCurrency: res.data.localCurrency
              }
              this.setState({settings})
              toast.success('Api returned successfully!');
            }
          });
      } catch (e) {
        toast.error(e);
      }
    }

    this.getRates = () => {
      axios.get("https://api.opennode.com/v1/rates")
        .then(res => {
          const rates = res.data.data;
          this.setState({rates});
        });
    }

    this.logout = async () => {
      await this.authService.logout();
    };

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

    this.setSettings = (settings) => {
      this.setState({settings: settings});
    }

    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.state = {
      user: {},
      dbUser: {},
      settings: {},
      rates: {},
    };
  }

  componentDidMount() {
    this.authService.getUser()
      .then(user => {
        if (user) {
          toast.success("User has been loaded from store.");
          this.addUser();
          this.getRates();
        } else {
          toast.info("You are not logged in.");
        }
        this.setState({user});
      })
      .catch(() => {
        this.logout();
      });
  }

  render() {
    return (
      <div className="min-h-screen flex flex-column">
        <div className="bg-gray-900" style={{height: "200px"}}>
          <Header pageTitle="Bsp 2 Gruppe 08"
                  logoSrc={logo}
                  login={this.login}
                  logout={this.logout}
                  user={this.state.user}/>
        </div>
        <div className="p-5 flex flex-column flex-auto" style={{marginTop: "-8rem"}}>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto">
            <Routes>
              <Route path="/" element={<AppContent apiService={this.apiService}
                                                   getUser={this.getUser}
                                                   renewToken={this.renewToken}
                                                   getHistory={this.getHistory}
                                                   state={this.state}
                                                   getRates={this.getRates}/>}/>
              <Route path="/payment" element={<PaymentPage state={this.state}
                                                           setState={this.setState}
                                                           api={this.apiService}/>}/>
              <Route path="/history" element={<History user={this.state.user}
                                                       api={this.apiService}/>}/>
              <Route path="/settings" element={<Settings state={this.state}
                                                         setSettings={this.setSettings}
                                                         addUser={this.addUser}
                                                         logout={this.logout}
                                                         api={this.apiService}/>}/>
              <Route path="/profile" element={<Profile user={this.state.user}
                                                       getUser={this.getUser}/>}/>
              <Route path="success" element={<PaymentSuccess/>}/>
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
