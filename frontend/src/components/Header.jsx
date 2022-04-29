import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

export default function Header(props) {

  return (
    <header className="mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={props.logoSrc} className="App-logo" alt="logo" />
          </a>

          <ul className="nav nav-pills col-12 col-lg-auto me-lg-auto mr-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            {props.user != null &&
              <li className="nav-item">
                <NavLink to="/payment" className="nav-link">Zahlung</NavLink>
              </li>
            }
            {props.user != null &&
              <li className="nav-item">
                <NavLink to="/history" className="nav-link">Historie</NavLink>
              </li>
            }
            {props.user != null &&
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">Einstellungen</NavLink>
              </li>
            }

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
                <img src={props.user.profile.picture} alt="avatar" width="32" height="32" className="rounded-circle" />
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem>
                  <Link to="profile" style={linkStyle}>
                    {props.user.profile.name}
                    <span className="d-block text-muted">@{props.user.profile.preferred_username}</span>
                  </Link>
                </DropdownItem>
                <Dropdown.Divider />
                <DropdownItem onClick={props.logout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }

        </div>
      </div>
    </header>
  );
}

const linkStyle = {
  color: "#212529"
}
