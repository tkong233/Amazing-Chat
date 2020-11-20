import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
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
        <button
          onClick={ onLogoutClick }
          style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
          className="btn waves-effect waves-light hoverable blue-grey darken-1"
        >
        Logout
      </button>
      </div>
    </div>
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