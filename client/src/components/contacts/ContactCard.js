import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
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
import BackspaceIcon from '@material-ui/icons/Backspace';
import { deleteContact } from '../../actions/contactActions';
import { joinRoom, loadPastMessages, receiveNewMessages, receiveVideoCall, deleteConversation } from '../../actions/chatActions';
import { setSocket } from '../../actions/authActions';

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
    const newDate = (new Date(date)).toString();
    return newDate.substring(15, 21) + ', ' + newDate.substring(3, 11);
  }
  return "";
}

const ContactCard = (props) => {
  const { name, profilePicture, lastInteractTime, userEmail, contactEmail } = props;
  const { socket, pairId } = props.chat;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleCollapse = () => {
    setOpen(!open);
  };

  const launchChat = () => {
    console.log('launching chat, socket exist?', socket);
    if (props.chat.pairId === props.pairId) {
      socket.room = props.pairId;
      props.joinRoom(props.user.name, name, userEmail, contactEmail, props.pairId, socket);
      console.log('already joined room');
      return;
    }

    if (!socket) {
      setSocket(userEmail);
    }

    props.joinRoom(props.user.name, name, userEmail, contactEmail, props.pairId, socket);
    props.loadPastMessages(props.pairId);
    props.receiveNewMessages(socket);
    props.receiveVideoCall(socket, userEmail);
  }

  return (
    <div data-test = "ContactCardComponent">
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
          {/* Delete Contact */}
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.deleteContact(userEmail, contactEmail, pairId);
              toggleCollapse();
            }} >
          <ListItemIcon>
              <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary="Delete Contact" />
          </ListItem>

          {/* Clear Conversation */}
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.deleteConversation(pairId);
              toggleCollapse();
            }}>
          <ListItemIcon>
              <BackspaceIcon/>
            </ListItemIcon>
            <ListItemText primary="Clear Conversation" />
          </ListItem>
        </List>
      </Collapse>
      </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  chat: state.chat
});

export default connect(
  mapStateToProps, 
  {
    deleteContact,
    joinRoom,
    loadPastMessages,
    receiveNewMessages,
    receiveVideoCall,
    setSocket,
    deleteConversation,
  }
)(ContactCard);