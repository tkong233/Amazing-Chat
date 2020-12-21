import React from "react";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { addContact, getSuggestion } from "../../actions/contactActions";

const addContactFromSuggestion = (props, email1, email2) => {
  props.addContact(email1, email2);
  props.getSuggestion(email1);
};

const SuggestionCard = (props) => {
  const { name, profilePicture, userEmail, suggestionEmail } = props;

  return (
    <ListItem data-test="SuggestionCardComponent">
      <ListItemAvatar>
        <Avatar alt={name} src={profilePicture} />
      </ListItemAvatar>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          onClick={() =>
            addContactFromSuggestion(props, userEmail, suggestionEmail)
          }
          style={{backgroundColor: "transparent"}}
        >
          Add
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addContact, getSuggestion })(
  SuggestionCard
);
