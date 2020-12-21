import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ContactCard  from './ContactCard';
import SuggestionCard from './SuggestionCard';
import { getAllUsers } from '../../actions/contactActions';

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

const SearchBar = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getAllUsers();
  }, [])

  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setResult(newValue == '' ? [] : props.users.filter(
      (user) => {
        return user.name.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
      }
    ));
  }

  const findInContact = (user) => {
    return props.contacts.filter(c => c.name === user.name)
  }

  return (
    <div data-test = "SearchBarComponent">
      {/* Search Input */}
    <div className="input-field">
      <input
      onChange={onChange}
      value={value}
      id="search"
      type="text"
    />
      <label htmlFor="search">Search</label>
    </div>

    {/* Search Result */}
    {value === '' ? null : (
      <List className={classes.root} alignItems="flex-start">
        <ListItem>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search Result" />
        </ListItem>
        <Divider/>
          {result.map(r => {
            const contact = findInContact(r);
            return (
            contact.length > 0 ?
              <ContactCard
                name={contact[0].name}
                profilePicture={contact[0].profile_picture}
                lastInteractTime={contact[0].lastInteractTime}
                userEmail={props.user.email}
                contactEmail={contact[0].email}
                pairId={contact[0].pairId}
              />
              :
              <SuggestionCard
                name={r.name}
                profilePicture={r.profile_picture}
                userEmail={props.user.email}
                suggestionEmail={r.email}
              />
          )})}
        </List>
    )}
    
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  users: state.contact.users,
  contacts: state.contact.contacts,
})

export default connect(
  mapStateToProps,
  { getAllUsers }
)(SearchBar)