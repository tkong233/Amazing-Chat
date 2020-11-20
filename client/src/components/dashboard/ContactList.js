import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

import ContactCard from './ContactCard';
import { addContact } from '../../actions/contactActions';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '25ch',
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
  console.log(contacts);

  return (
    <List className={classes.root} alignItems="flex-start">
    <ListItem>
      <ListItemIcon>
        <PermContactCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItem>
    <Divider/>
      {contacts.map(s => (
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={props.name} src={props.profile_picture}/>
          </ListItemAvatar>
          <ListItemText
          primary={s.name}
          secondary={s.lastInteractTime}
        />
        </ListItem>
        ))}
    </List>
  )
}

// onClick={() => props.addContact(props.user.email, s.email)}
const mapStateToProps = state => ({
  contact: state.contact,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { addContact }
)(ContactList)