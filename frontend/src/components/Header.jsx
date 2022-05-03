import * as React from "react";
import {createRef} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../logo.svg";
import {Avatar} from "primereact/avatar";
import {Menu} from "primereact/menu";

export default function Header(props) {
  const profileMenu = createRef();
  const navigate = useNavigate();

  const profileMenuModel = [
    {
      label: "Profil",
      command: () => {
        navigate("/profile")
      }
    },
    {
      label: "Abmelden",
      command: () => {
        props.logout()
      }
    }
  ];

  return (
    <header className="py-3 px-5 flex align-items-center justify-content-between relative lg:static"
            style={{minHeight: "80px"}}>
      <img src={logo} alt="react logo" height="40" className="mr-0 lg:mr-6 lg:block hidden App-logo"/>
      <div className="align-items-center flex-grow-1 justify-content-between flex w-full bg-gray-900 z-1">
        <ul className="list-none p-0 m-0 flex align-items-center select-none flex-row flex-wrap lg:justify-content-start justify-content-center">
          <li className="lg:block hidden">
            <NavLink to="/"
                     className="p-ripple flex lg:px-6 p-3 sm:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150"
                     activeclassname="active">
              <i className="pi pi-home mr-2"></i>
              <span>Home</span>
            </NavLink>
          </li>
          {props.user != null &&
            <li>
              <NavLink to="/payment"
                       className="p-ripple flex lg:px-6 p-3 px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150">
                <i className="pi pi-money-bill mr-2"></i>
                <span>Zahlung</span>
              </NavLink>
            </li>
          }
          {props.user != null &&
            <li>
              <NavLink to="/history"
                       className="p-ripple flex lg:px-6 p-3 px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150">
                <i className="pi pi-book mr-2"></i>
                <span>Historie</span>
              </NavLink>
            </li>
          }
          {props.user != null &&
            <li>
              <NavLink to="/settings"
                       className="p-ripple flex lg:px-6 p-3 px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150">
                <i className="pi pi-cog mr-2"></i>
                <span>Einstellungen</span>
              </NavLink>
            </li>
          }
        </ul>

        {props.user == null &&
          <div>
            <button type="button" className="p-button p-component"
                    onClick={props.login}>
              <span className="p-button-label p-c">
                Login
              </span>
            </button>
          </div>
        }

        {props.user != null && props.user.profile != null &&
          <div>
            <Menu model={profileMenuModel}
                  popup ref={profileMenu}/>
            <Avatar image={props.user.profile.picture}
                    shape="circle"
                    onClick={(event) => profileMenu.current.toggle(event)}/>
          </div>
        }
      </div>

    </header>
  )
}

/*

<Dropdown className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 border-gray-800 lg:border-top-none">
            <DropdownToggle variant="tertiary">
              <img src={props.user.profile.picture} alt="avatar" width="32" height="32" className="rounded-circle" />
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem>
                <Link to="profile">
                  {props.user.profile.name}
                </Link>
              </DropdownItem>
              <Dropdown.Divider />
              <DropdownItem onClick={props.logout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>



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

const linkStyle = {
  color: "#212529"
}*/

/*
<a className="p-ripple cursor-pointer block lg:hidden text-gray-400 ml-auto" onClick={toggle}>
        <i className="pi pi-bars text-4xl"></i>
        <span className="p-ink" style={{height: "34px", width: "34px", top: "7px", left: "1px"}}></span>
      </a>
 */
