import React, { Component, useEffect } from "react";
import { connect } from "react-redux";

import SuggestionList from './SuggestionList';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import { getSuggestion, getContacts, getAllUsers } from '../../actions/contactActions';

import './Contact.css';

const ENDPOINT = 'localhost:5000/';

const ContactSideBar = (props) => {
  useEffect(() => {
    props.getSuggestion(props.user.email);
    props.getContacts(props.user.email);
    props.getAllUsers();
  }, [])

  return (
    <div
      className='contact-side-bar'
      data-test = "ContactSideBarComponent">
      <SearchBar/>
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
  {
    getSuggestion,
    getContacts,
    getAllUsers,
  }
)(ContactSideBar);