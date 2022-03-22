import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home } from "../components/Home";
import { Profile } from "../components/Profile";
import { Callback } from "../Callback";

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">React AppAuth JS</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/callback" component={Callback} />
      </div>
    </Router>
  );
}

export default App;
