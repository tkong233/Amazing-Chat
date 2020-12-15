import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';


import ContactCard from './ContactCard';
import { addContact, deleteContact } from '../../actions/contactActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  button: {
    maxWidth: '5px'
  }
}));

const ContactList = (props) => {
  const classes = useStyles();
  let { contacts } = props.contact;
  contacts = contacts.sort((a, b) => (a.lastInteractTime < b.lastInteractTime) ? 1 : (a.lastInteractTime > b.lastInteractTime) ? -1 : 0);

  return (
    <List className={classes.root} alignItems="flex-start" data-test = "ContactListComponent">
    <ListItem>
      <ListItemIcon>
        <PermContactCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItem>
    <Divider/>
    {contacts.map(contact =>
      // props: name, profilePicture, lastInteractTime, userEmail, contactEmail, pairId
      <ContactCard
        name={contact.name}
        profilePicture={contact.profile_picture}
        lastInteractTime={contact.lastInteractTime}
        userEmail={props.user.email}
        contactEmail={contact.email}
        pairId={contact.pairId}
      />)
    }
    </List>
  )
}

const mapStateToProps = state => ({
  contact: state.contact,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { addContact, deleteContact }
)(ContactList)