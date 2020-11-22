import React, { Component, useEffect } from "react";
import { connect } from "react-redux";

import SuggestionList from './SuggestionList';
import ContactList from './ContactList';
import { getSuggestion, getContacts } from '../../actions/contactActions';


const Dashboard = (props) => {
  useEffect(() => {
    props.getSuggestion(props.user.email);
    props.getContacts(props.user.email);
  }, [])
  return (
    <div data-test = "DashboardComponent">
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <SuggestionList/>
      <ContactList/>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  contact: state.contact,
});


export default connect(
  mapStateToProps,
  { getSuggestion, getContacts }
)(Dashboard);
