import * as React from "react";
import {NavLink} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

export default function Header(props) {
  return (
    <header className="my-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={props.logoSrc} className="App-logo" alt="logo"/>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mr-lg-auto mb-2 justify-content-center mb-md-0">
            <NavLink to="/" className="nav-link px-2 link-secondary">Home</NavLink>
            <NavLink to="/payment" className="nav-link px-2 link-dark">Zahlung</NavLink>
            <NavLink to="/history" className="nav-link px-2 link-dark">Historie</NavLink>
            <NavLink to="/settings" className="nav-link px-2 link-dark">Einstellungen</NavLink>
          </ul>

          {props.user == null &&
            <div>
              <button type="button"
                      className="btn btn-outline-primary me-2"
                      onClick={props.login}>
                Login
              </button>
            </div>
          }

          {props.user != null && props.user.profile != null &&
            <Dropdown>
              <DropdownToggle variant="tertiary">
                <img src={props.user.profile.picture} alt="avatar" width="32" height="32" className="rounded-circle"/>
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem onClick={props.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }

        </div>
      </div>
    </header>
  );
}
