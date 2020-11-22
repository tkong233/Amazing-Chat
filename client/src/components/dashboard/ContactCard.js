import React from 'react';
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
import NotesIcon from '@material-ui/icons/Notes';
import { deleteContact } from '../../actions/contactActions';


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


const ContactCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggleCollapse = () => {
    setOpen(!open);
  };

  const { contact, user } = props;
  return (
    <div>
        <ListItem >
          <ListItemAvatar>
            <Avatar alt={user.username} src={user.profile_picture}/>
          </ListItemAvatar>
          <ListItemText
          primary={contact.name}
          secondary={transformDateFormat(contact.lastInteractTime)}
        />
        {open ? <ExpandLess onClick={toggleCollapse}/> : <ExpandMore onClick={toggleCollapse}/>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* <ListItem button className={classes.nested} onClick={() => "TODO: implement profile popup card"} >
          <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="View Profile" />
          </ListItem> */}
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.deleteContact(user.email, contact.email);
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

});

export default connect(
  mapStateToProps, 
  { deleteContact }
)(ContactCard);