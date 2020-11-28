import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { addContact, getSuggestion } from '../../actions/contactActions';
import SuggestionCard from './SuggestionCard';

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

const addContactFromSuggestion = (props, email1, email2) => {
  props.addContact(email1, email2);
  props.getSuggestion(email1);
}

const SuggestionList = (props) => {
  const classes = useStyles();
  let { suggestion } = props.contact;
  suggestion = suggestion.slice(0, 3);

  return (
    <List className={classes.root} alignItems="flex-start">
    <ListItem>
      <ListItemIcon>
        <PersonAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Suggestions" />
    </ListItem>
    <Divider/>
      {suggestion.map(s => 
      // props: name, profilePicture, userEmail, suggestionEmail
        <SuggestionCard
          name={s.name}
          profilePicture={s.profile_picture}
          userEmail={props.user.email}
          suggestionEmail={s.email}
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
  { addContact, getSuggestion }
)(SuggestionList)

// (
//   <ListItem>
//     <ListItemAvatar>
//       <Avatar alt={props.name} src={props.profile_picture}/>
//     </ListItemAvatar>
//     <ListItemText
//     primary={s.name}
//   />
//   <ListItemSecondaryAction>
//     <Button
//       variant="outlined"
//       onClick= { () => addContactFromSuggestion(props, props.user.email, s.email) }
//     >
//       Add
//     </Button>
//   </ListItemSecondaryAction>
//   </ListItem>
//   )