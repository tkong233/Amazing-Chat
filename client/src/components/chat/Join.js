import React from 'react';

class Join extends React.Component {
  render() {
    const { onSubmit, onChange, username, room } = this.props;
    return (
      <div className="container" data-test = "JoinComponent">
        <div className="row">
        <div className="col s8 offset-s2">
        <form noValidate onSubmit={onSubmit}>
          {/* Name */}
          <div className="input-field col s12">
            <input
            onChange={onChange}
            value={username}
            id="username"
            type="text"
          />
            <label htmlFor="username">Username</label>
          </div>

          {/* Room */}
          <div className="input-field col s12">
            <input
            onChange={onChange}
            value={room}
            id="room"
            type="text"
          />
            <label htmlFor="room">Room</label>
          </div>

          {/* Submit Button */}
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            type="submit"
            className="btn waves-effect waves-light hoverable blue-grey darken-2"
            >
            Join
            </button>
          </div>
        </form>
        </div>
        </div>
        </div>
    )
  }
}

export default Join;