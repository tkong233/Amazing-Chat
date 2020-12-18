import React from "react";
import "./ViewStatus.css";
import { Button, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { doPostStatus } from "../../actions/authActions";

class PostStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      imageURL: "",
      text: "",
    };
  }

  onImageChange = (e) => {
    e.preventDefault();
    this.setState({
      imageURL: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0]
    });
  };

  onTextChange = (e) => {
    e.preventDefault();
    this.setState ({
        text: e.target.value,
    });
  }

  onSubmit = (e) => {    
    if (!this.state.image && !this.state.text) {
        // TODO: add alert message
        console.log("no image or text");
        return;
    }
    if (!this.state.image || !this.state.text) {
      alert("You have to add both text and image!");
      return;
    }
    const formData = new FormData();
    formData.append("NonTextfile", this.state.image);
    formData.append("text", this.state.text);
    const { email } = this.props.user;
    this.props.doPostStatus(formData, email, this.props.history);
  };

  render() {
    return (
      <div className="container" data-test = "postStatusComponent" style={{marginTop: "50px"}}>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" onChange={this.onTextChange}/>
                <label htmlFor="last_name">Your status</label>
              </div>
            </div>
            <div className="row">
              <Box display="flex" justifyContent="space-around">
                <Button
                  style={{ color: "#455a64", backgroundColor: "white" }}
                  variant="contained"
                  component="label"
                >
                  Choose an image
                  <input
                    type="file"
                    name="file"
                    style={{ display: "none" }}
                    onChange={this.onImageChange}
                  />
                </Button>
              </Box>
            </div>
            <div className="row">
              <Box display="flex" justifyContent="space-around">
                {this.state.imageURL ? (
                  <img
                    style={{
                      maxWidth: "50%",
                      maxHeight: "50%",
                      borderRadius: "8px",
                    }}
                    src={this.state.imageURL}
                    alt=""
                  />
                ) : (
                  ""
                )}
                {/* {this.state.text} */}
              </Box>
            </div>
            <div className="row">
              <Box display="flex" justifyContent="space-around" p={2}>
                <Button id="button"
                  style={{ color: "white", backgroundColor: "#455a64" }}
                  variant="contained"
                  onClick={this.onSubmit}
                >
                  Post!
                </Button>{" "}
              </Box>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
  });

export default connect(mapStateToProps, { doPostStatus })(PostStatus);

