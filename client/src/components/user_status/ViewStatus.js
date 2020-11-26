import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./ViewStatus.css";
import Stories from "react-insta-stories";
import { Avatar } from "@material-ui/core";
import axios from "axios";

const ViewStatus = (props) => {
  const [status, setStatus] = useState("");
  const { email } = props.user;
  useEffect(() => {
    axios
      .get(`/status/${email}`)
      .then((res) => {
        const data = convertToDiv(res.data);
        if (data.length !== 0) {
          setStatus(data);
        } else {
          setStatus(stories2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onEnd = (id) => {
    if(!id) return;
    axios
      .post(`/status/seen/${email}/${id}`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ViewStatus">
      <div className="stories">
        {status && (
          <Stories
            loop={false}
            width={600}
            keyboardNavigation
            defaultInterval={10000}
            stories={status}
            onStoryEnd={(s, st) => {
              onEnd(st.id);
            }}
            onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
            onStoryStart={(s, st) => console.log("story started", s, st)}
          />
        )}
      </div>
    </div>
  );
};

const convertToDiv = (data) => {
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
                <h4>{status.statusData.text}</h4>
              </div>
            </div>
          );
        } else {
          return (
            <div style={{ ...contentStyle }}>
              <div style={{ display: "flex" }}>
                <Avatar style={{}} src={status.profile_picture} alt="" />
                <h6 style={{ marginLeft: "10px" }}>{status.name}</h6>
              </div>

              <div style={{ position: "absolute", bottom: 50 }}>
                <h4>{status.statusData.text}</h4>
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

const stories2 = [
  {
    content: () => {
      return (
        <div
          style={{
            ...contentStyle,
            backgroundImage: 'url("/uploads/1.jpg")',
          }}
        >
          {/* <div style={{ display: "flex" }}>
            <Avatar style={{}} src="" alt="" />
            <h6 style={{ marginLeft: "10px" }}>Username here</h6>
          </div> */}

          <div style={{ textAlign: "center" }}>
            <h4>
              Oops! No new status from your friends! 
            </h4>
          </div>
        </div>
      );
    },
  },
];

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
