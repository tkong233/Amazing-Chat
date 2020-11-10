import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

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
  
  const { name, id, profile_picture } = props.auth.user;
  useEffect(() => {
    setImage(profile_picture);
  });
  
  const onChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`/api/users/upload_profile_image/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { filePath } = res.data;
    console.log(filePath);
    setImage(filePath);
  };
  

  return (
    <Card>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={ classes.avatar } src={ image } alt=''/>
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
          <Button variant="contained" component="label">
            Update your profile picture!
            <input
              type="file"
              name="file"
              style={{ display: "none" }}
              onChange={onChange}
            />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
