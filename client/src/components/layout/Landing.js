import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button } from '@material-ui/core';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome</b> to the {" "}
              <span style={{ fontFamily: "monospace" }}>Chatting Room</span> !
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Discover your favorite living style
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn waves-effect waves-light hoverable blue-grey darken-1"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn waves-effect waves-light hoverable blue-grey darken-1"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
