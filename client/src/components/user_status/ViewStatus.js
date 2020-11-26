import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./ViewStatus.css";
import Stories from "react-insta-stories";
import { Avatar } from "@material-ui/core";
import axios from "axios";

const ViewStatus = (props) => {
  const [status, setStatus] = useState("");
  const { email } = props.user;
  // const statusList = [];
  useEffect(() => {
    axios
      .get(`/status/${email}`)
      .then((res) => {
        setStatus(convertToDiv(res.data));
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <div className="ViewStatus">
      <div className="stories">
        {status && 
          <Stories
            loop={false}
            width={600}
            keyboardNavigation
            defaultInterval={2000}
            stories={status}
            onStoryEnd={(s, st) => {
              console.log(st.id);
            }}
            // onStoryEnd={(s, st) => console.log("story ended", s, st)}
            onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
            onStoryStart={(s, st) => console.log("story started", s, st)}
          />
        }
      </div>
    </div>
  );
};

const convertToDiv = (data) => {
  console.log(data);
  let list = [];
  data.forEach((status) => {
    list.push({
      content: () => {
        if (status.statusData.image) {
          return (
            <div
              style={{
                ...contentStyle,
                backgroundImage: `url(${status.statusData.image})`,
              }}
            >
              <div style={{ display: "flex" }}>
                <Avatar style={{}} src={status.profile_picture} alt="" />
                <h6 style={{ marginLeft: "10px" }}>{status.name}</h6>
              </div>
  
              <div style={{ position: "absolute", bottom: 50 }}>
                <h4>
                {status.statusData.text}
                </h4>
              </div>
            </div>
          );
        } else {
          return (
            <div
              style={{ ...contentStyle }}
            >
              <div style={{ display: "flex" }}>
                <Avatar style={{}} src={status.profile_picture} alt="" />
                <h6 style={{ marginLeft: "10px" }}>{status.name}</h6>
              </div>
  
              <div style={{ position: "absolute", bottom: 50 }}>
                <h4>
                {status.statusData.text}
                </h4>
              </div>
            </div>
          );
        }
        
      },
      id: status.statusData.statusId,
    });
  });
  return list;
};

const contentStyle = {
  background: "#546e7a",
  width: "100%",
  padding: 20,
  color: "white",
  textShadow: "0 0 1px #000",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center center",
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ViewStatus);
