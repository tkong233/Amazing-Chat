import React from 'react';
import { Link } from 'react-router-dom';
import classnames from "classnames";
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
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
    
        const userData = {
          email: this.state.email,
          question: this.state.question,
          answer: this.state.answer,
          password: this.state.password,
          password2: this.state.password2
        };
        
        console.log(userData);
        // this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;

        return (
        <div className="container">
        <div className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Reset Password</b> below
                </h4>
                </div>

                {/* Email */}
                <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                        invalid: errors.email
                    })}
                    />
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
                        <option value="" disabled selected>Choose your security question</option>
                        {SecurityQuestions.map(q => <option value={q}>{q}</option>)}
                    </select>
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
                        invalid: errors.answer
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
                        invalid: errors.password
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
                        invalid: errors.password2
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
                        marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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

export default Reset;