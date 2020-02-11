import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              uznu_app
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link
                  to="/login"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
