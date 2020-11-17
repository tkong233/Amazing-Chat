import React from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import { SecurityQuestions } from "./SecurityQuestions";

class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      question: "",
      answer: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      question: this.state.question,
      answer: this.state.answer,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.resetPassword(userData, this.props.history);
    // this.props.loginUser(userData);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container" data-test="resetComponent" style={{marginTop:'100px'}}>
        <div className="row">
          <div className="col s6 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s6 blue-grey-text text-darken-2" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Reset Password</b> below
              </h4>
            </div>
        
            {/* Email */}
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s6">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                {console.log(errors)}
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              {/* Security Question */}
              <div className="input-field col s12">
                <select
                  onChange={this.onChange}
                  value={this.state.question}
                  error={errors.question}
                  id="question"
                >
                  <option value="" disabled selected>
                    Choose your security question
                  </option>
                  {SecurityQuestions.map((q) => (
                    <option value={q}>{q}</option>
                  ))}
                </select>
                <span className="red-text">{errors.question}</span>
              </div>

              {/* Answer */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.answer}
                  error={errors.answer}
                  id="answer"
                  type="text"
                  className={classnames("", {
                    invalid: errors.answer,
                  })}
                />
                <label htmlFor="password">Answer</label>
                <span className="red-text">{errors.answer}</span>
              </div>

              {/* New Password */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">New Password</label>
                <span className="red-text">{errors.password}</span>
              </div>

              {/* Confirm Password */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>

              {/* Submit Button */}
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn waves-effect waves-light hoverable blue-grey darken-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { resetPassword })(Reset);
