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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';

import ContactCard from './ContactCard';
import { addContact, deleteContact } from '../../actions/contactActions';


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

const transformDateFormat = (date) => {
  date = date.split('T');
  return date[1].substring(0, 5) + ', ' + date[0]
}

const ContactList = (props) => {
  const classes = useStyles();
  const { contacts } = props.contact;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <div>
        <ListItem onClick={handleClick}>
          <ListItemAvatar>
            <Avatar alt={props.username} src={props.user.profile_picture}/>
          </ListItemAvatar>
          <ListItemText
          primary={s.name}
          secondary={transformDateFormat(s.lastInteractTime)}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={() => props.deleteContact(props.user.email, s.email)} >
            {/* props.deleteContact(props.user.email, s.email) */}
          {/* onClick={() => props.deleteContact(props.user.email, s.email)} */}
          <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Collapse>
        </div>
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
  { addContact, deleteContact }
)(ContactList)