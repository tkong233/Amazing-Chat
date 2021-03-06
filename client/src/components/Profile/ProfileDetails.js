import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';

import { useHistory } from "react-router";


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EventIcon from '@material-ui/icons/Event';
import { deleteAccount, logoutUser } from "../../actions/authActions";


const useStyles = makeStyles((theme) => ({
  root: {backgroundColor: 
    theme.palette.background.paper,}
}));

const ProfileDetails = ( props ) => {
  const classes = useStyles();
  const history = useHistory();
  const { date, email } = props.auth.user;
  const onDelete = (e) => {
    e.preventDefault();
    props.deleteAccount(email);
    props.logoutUser();
    history.push("/login");
  }
  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card data-test = "ProfileDetailsComponent">
        <CardHeader
          subheader="View your profile here"
          title="Profile"
        />
        <Divider />
        <CardContent>
        <div className={classes.root}>
        <ListItem >
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={`Email: ${email}`} />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary={`Registration date: ${date.substring(0, 10)}`} />
        </ListItem>
      </div></ CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          p={2}
        >
          <Link to='/reset'>
          <Button
            style={{color: 'white', backgroundColor: '#455a64'}}
            variant="contained"
          >
            Change Password
          </Button>
          </Link>

          <Button
            color="warning"
            variant="contained"
            onClick={onDelete}
          >
            Deactivate the account
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAccount, logoutUser }
)(ProfileDetails);