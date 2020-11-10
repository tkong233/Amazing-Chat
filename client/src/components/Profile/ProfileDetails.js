import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
  root: {backgroundColor: 
    theme.palette.background.paper,}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
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
          <ListItemText primary={`Email: `} />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary={`Registration date: `} />
        </ListItem>
      </div></ CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Change Password
          </Button>
          <Button
            color="warning"
            variant="contained"
          >
            Deactivate the account
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
