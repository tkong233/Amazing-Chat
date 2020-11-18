import React from "react";
import "./ViewStatus.css";
import Stories from "react-insta-stories";
import { Avatar } from "@material-ui/core";

class ViewStatus extends React.Component {
  render() {
    return (
      <div className="ViewStatus">
        <div className="stories">
          <Stories
            loop
            keyboardNavigation
            defaultInterval={10000}
            stories={stories2}
            onStoryEnd={(s, st) => console.log("story ended", s, st)}
            onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
            onStoryStart={(s, st) => console.log("story started", s, st)}
          />
        </div>
      </div>
    );
  }
}


const stories2 = [
  {
    content: ({ action, isPaused }) => {
      return (
        <div
          style={{
            ...contentStyle,
            backgroundImage: 'url("/uploads/1.jpg")',
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar style={{}} src="" alt="" />
            <h6 style={{ marginLeft: "10px" }}>Username here</h6>
          </div>

          <div style={{ position: "absolute", bottom: 0 }}>
            <h4>
              User status is here. User status is here. User status is here.
              User status is here. User status is here.
            </h4>
          </div>
        </div>
      );
    },
  },
  {
    content: ({ action, isPaused }) => {
      return (
        <div
          style={{
            ...contentStyle,
            backgroundImage: 'url("/uploads/2.jpg")',
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar style={{}} src="" alt="" />
            <h6 style={{ marginLeft: "10px" }}>Username here</h6>
          </div>

          <div style={{ position: "absolute", bottom: 0 }}>
            <h4>
              User status is here. User status is here. User status is here.
              User status is here. User status is here.
            </h4>
          </div>
        </div>
      );
    },
  },
  {
    content: ({ action, isPaused }) => {
      return (
        <div
          style={{
            ...contentStyle,
            backgroundImage: 'url("/uploads/3.jpg")',
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar style={{}} src="" alt="" />
            <h6 style={{ marginLeft: "10px" }}>Username here</h6>
          </div>

          <div style={{ position: "absolute", bottom: 0 }}>
            <h4>
              User status is here. User status is here. User status is here.
              User status is here. User status is here.
            </h4>
          </div>
        </div>
      );
    },
  },
];

const contentStyle = {
  //   background: "CornflowerBlue",
  width: "100%",
  padding: 20,
  color: "white",
  textShadow: "0 0 1px #000",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center center",
};


export default ViewStatus;
