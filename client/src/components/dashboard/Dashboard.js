import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UserInfoCard from './UserInfoCard';
import { getSuggestion, addContact, deleteContact, getContacts } from '../../actions/contactActions';


const Dashboard = (props) => {
  useEffect(() => {
    props.getSuggestion("tkong@wesleyan.edu");
    props.getContacts("yoyo@123.com");
    console.log(props.contact);
  }, [])
  return (
    <div data-test = "DashboardComponent">
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      {/* <UserInfoCard/> */}
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  contact: state.contact,
});


export default connect(
  mapStateToProps,
  { getSuggestion, getContacts, getSuggestion, deleteContact }
)(Dashboard);
