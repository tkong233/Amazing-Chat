import React from "react";
import { connect } from "react-redux";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { deleteMessage } from "../../actions/chatActions";
import "./Message.css";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const Message = (props) => {
  // const { text, sender, user, type, date } = props;
  const {
    text,
    sender,
    user,
    type,
    from,
    to,
    pairId,
    datetime,
    message,
  } = props;
  const dateTimeZone = new Date(datetime).toString();
  const classes = useStyles();
  const position = sender === user ? "right" : "left";
  const anchorOrigin = {
    vertical: "top",
    horizontal: position,
  };
  const style =
    position === "left" ? { textAlign: "left" } : { textAlign: "right" };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleMessageOnClick = (e) => {
    handleOpenPopover(e);
  };

  const handleDeleteMessage = () => {
    console.log("handle delete message", message);
    const data = { from, to, message, pairId, datetime };
    props.deleteMessage(data);
    handleClosePopover();
  };

  if (
    props.text.substring(0, 45) ===
      "https://cis557-amazing-chat.s3.amazonaws.com/" ||
    "uploads/"
  ) {
    const file_ext = props.text
      .substring(props.text.length - 3, props.text.length)
      .toLowerCase();
    if (
      file_ext === "mp4" ||
      file_ext === "webm" ||
      file_ext === "avi" ||
      file_ext === "mov"
    ) {
      return (
        <div style={style}>
          <video
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "5px",
              marginBottom: "5px",
              borderRadius: "8px",
              boxShadow: "0 0 2px 0px gray",
              maxWidth: "300px",
            }}
            src={`${props.text}`}
            alt="video"
            type="video/mp4"

            controls
            onClick={handleMessageOnClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={anchorOrigin}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography
              className={classes.typography}
              onClick={handleDeleteMessage}
            >
              Delete
            </Typography>
          </Popover>
        </div>
      );
    } else if (file_ext === "mp3" || file_ext === "wav" || file_ext === "ogg") {
      return (
        <div style={style}>
          <audio
            src={`${props.text}`}
            alt="audio"
            type="audio/ogg"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "5px",
              marginBottom: "5px",
              borderRadius: "8px",
              boxShadow: "0 0 2px 0px gray",
            }}
            controls
            onClick={handleMessageOnClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={anchorOrigin}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography
              className={classes.typography}
              onClick={handleDeleteMessage}
            >
              Delete
            </Typography>
          </Popover>
        </div>
      );
    } else if (
      file_ext === "png" ||
      file_ext === "jpg" ||
      file_ext === "jpeg"
    ) {
      return (
        <div style={style}>
          <img
            // max-width = "250px"
            // max-height = "250px"
            src={`${props.text}`}
            alt="Imgupload"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "5px",
              marginBottom: "5px",
              maxWidth: "250px",
              maxHeight: "250px",
              borderRadius: "8px",
              boxShadow: "0 0 2px 0px gray",
            }}
            onClick={handleMessageOnClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={anchorOrigin}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography
              className={classes.typography}
              onClick={handleDeleteMessage}
            >
              Delete
            </Typography>
          </Popover>
        </div>
        // <div>
        //   <MessageBox
        //   className="message-bubble"
        //   position={position}
        //   type={"photo"}
        //   data={{
        //     uri: `${props.text}`,
        //   }}
        // />
        // </div>
      );
    } else {
      return (
        <div>
          <MessageBox
            className="message-bubble"
            position={position}
            type={"text"}
            text={props.text}
            dateString={
              dateTimeZone.substring(3, 11) + dateTimeZone.substring(15, 24)
            }
            onClick={handleMessageOnClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={anchorOrigin}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography
              className={classes.typography}
              onClick={handleDeleteMessage}
            >
              Delete
            </Typography>
          </Popover>
        </div>
      );
    }
  } else {
    return (
      <div data-test="MessageComponent">
        <MessageBox
          className="message-bubble"
          position={position}
          type={type}
          text={text}
          onClick={handleMessageOnClick}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={anchorOrigin}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography
            className={classes.typography}
            onClick={handleDeleteMessage}
          >
            Delete
          </Typography>
        </Popover>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, { deleteMessage })(Message);
