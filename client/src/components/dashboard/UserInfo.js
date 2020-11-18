import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 100,
    width: 100,
  }
}));

const UserInfo = (props) => {
  const { name, profile_picture, email } = props.user;
  const classes = useStyles();

  return (
    <div>
      <div>
        <div className={classes.avatar}>
          <Avatar
            className={ classes.avatar }
            alt={ name }
            src={ profile_picture }
          />
        </div>
        <div>
          { name }
        </div>
        <div>
          { email }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps
)(UserInfo);