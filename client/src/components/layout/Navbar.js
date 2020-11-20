import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../img/chat_icon.png";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    console.log("here");
    this.props.logoutUser();
  };
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <div className="container ">
              <img src={logo} width="50" height="50" alt="" />
              <a
                href="/dashboard"
                style={{fontFamily: '"Comfortaa", cursive'}}
                className="brand-logo blue-grey-text text-darken-2"
              >
                Amazing Chat
              </a>
              <ul className="right hide-on-med-and-down ">
                <li>
                  <a href="/chat" className="grey-text text-darken-2" style={{fontWeight: 'bold'}}>
                    Start Chat
                  </a>
                </li>
                <li>
                  <a href="/post_status" className="grey-text text-darken-2" style={{fontWeight: 'bold'}}>
                    Post Status
                  </a>
                </li>
                <li>
                  <a href="/status" className="grey-text text-darken-2" style={{fontWeight: 'bold'}}>
                    Check Status
                  </a>
                </li>
                <li>
                  <a href="/profile" className="grey-text text-darken-2" style={{fontWeight: 'bold'}}>
                    View Profile
                  </a>
                </li>
                <li>
                  <button
                    className="waves-effect waves-light btn blue-grey darken-1"
                    // style={{
                    //   backgroundColor: "grey",
                    // }}
                    onClick={this.onLogoutClick}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

// export default Navbar;
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

//  <nav>
// <div class="nav-wrapper">
//   <a href="#" class="brand-logo">Logo</a>
//   <ul id="nav-mobile" class="right hide-on-med-and-down">
//     <li><a href="sass.html">Sass</a></li>
//     <li><a href="badges.html">Components</a></li>
//     <li><a href="collapsible.html">JavaScript</a></li>
//   </ul>
// </div>
// </nav> */}
