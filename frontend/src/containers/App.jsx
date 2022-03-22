import React, {Component} from 'react';
import AppContent from '../components/AppContent';
import Header from '../components/Header';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header pageTitle="Bps 1 Gruppe 08" logoSrc={logo}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <AppContent/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
