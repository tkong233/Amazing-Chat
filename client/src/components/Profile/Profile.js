import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updatePicture } from "../../actions/authActions";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Dropzone from 'react-dropzone';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  
  const { name, email, profile_picture } = props.user;
  useEffect(() => {
    setImage(profile_picture);
  }, [profile_picture]);
  
  const onDrop = async (files) => {
    const file = files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("NonTextfile", file);
    await props.updatePicture(formData, email);
  };
  
  return (
    <Card data-test="profileComponent">
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={ classes.avatar } src={process.env.PUBLIC_URL + image} alt=''/>
          <br />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* Update Profile picture */}
      <CardActions>
        <Box display="flex" justifyContent="space-around" paddingLeft={10}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
              <section>
                  <div {...getRootProps()}>
                      <input {...getInputProps()} />                   
                      <Button 
                      variant="contained" component="label">
                        Update your profile picture!
                      </Button>
                  </div>
              </section>
          )}
      </Dropzone>
          {/* <Button variant="contained" component="label">
            Update your profile picture!
            <input
              type="file"
              name="file"
              style={{ display: "none" }}
              onChange={onChange}
            />
          </Button> */}
        </Box>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updatePicture })(Profile);
