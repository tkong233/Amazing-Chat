import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import io from 'socket.io-client';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import NotesIcon from '@material-ui/icons/Notes';
import { deleteContact } from '../../actions/contactActions';
import { connectSocket, joinRoom, loadPastMessages, receiveNewMessages } from '../../actions/chatActions';

let socket;
const ENDPOINT = 'localhost:5000/';

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
  if (date) {
    date = date.split('T');
    return date[1].substring(0, 5) + ', ' + date[0]
  }
  return "";
}

const ContactCard = (props) => {
  const { name, profilePicture, lastInteractTime, userEmail, contactEmail } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleCollapse = () => {
    setOpen(!open);
  };

  const launchChat = () => {
    socket = io(ENDPOINT);
    props.connectSocket(socket);
    props.joinRoom(props.user.name, props.pairId, userEmail, contactEmail, socket);
    props.loadPastMessages(props.pairId);
    props.receiveNewMessages(socket);
  }

  return (
    <div>
        <ListItem onClick={launchChat}>
          <ListItemAvatar>
            <Avatar alt={name} src={profilePicture}/>
          </ListItemAvatar>
          <ListItemText
          primary={name}
          secondary={transformDateFormat(lastInteractTime)}
          />
        {open ? <ExpandLess onClick={toggleCollapse}/> : <ExpandMore onClick={toggleCollapse}/>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.deleteContact(userEmail, contactEmail);
              toggleCollapse();
            }} >
          <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Collapse>
      </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  socket: state.chat.socket,
});

export default connect(
  mapStateToProps, 
  {
    deleteContact,
    connectSocket,
    joinRoom,
    loadPastMessages,
    receiveNewMessages,
  }
)(ContactCard);