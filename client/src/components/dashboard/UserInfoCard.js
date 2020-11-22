import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    maxWidth: 400
  },
  avatar: {
    height: 100,
    width: 100,
  }
}));

const UserInfoCard = (props) => {
  const { name, profile_picture, email } = props.user;
  const classes = useStyles();
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <Card className={classes.root}>
        <CardContent>
        <Grid container spacing={3}>
        <Grid item>
          <Avatar
            className={ classes.avatar }
            alt={ name }
            src={ profile_picture }
          />
        </Grid>

        <Grid item xs container direction="column" spacing={2}>
        <Grid item>{ name }</Grid>
        <Grid item>{ email }</Grid>
        <Grid item>
          <button
            onClick={ onLogoutClick }
            style={{
                      width: "100px",
                      height: "35px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
            className="btn waves-effect waves-light hoverable blue-grey darken-1"
          >
          Logout
        </button>
      </Grid>
      </Grid>

      </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
});


export default connect(
  mapStateToProps,
  { logoutUser }
)(UserInfoCard);