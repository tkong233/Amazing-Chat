import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import UserInfo from './UserInfo';
import { Alert } from '@material-ui/lab';

const Dashboard = (props) => {

  // const [alert, setAlert] = useState(true);
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <div>
      {/* { props.location.state && alert && <Alert severity="success" onClose={() => {setAlert(false)}}>You have successfully posted your status!</Alert>} */}
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <UserInfo/>
      {/* Logout Button */}
      <button
        onClick={ onLogoutClick }
      >
        Logout
      </button>
    </div>
  );
}


Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
