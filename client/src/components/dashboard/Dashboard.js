import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UserInfoCard from './UserInfoCard';


const Dashboard = (props) => {
  return (
    <div>
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <UserInfoCard/>
      {/* Logout Button */}
      
    </div>
  );
}


Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default Dashboard;
