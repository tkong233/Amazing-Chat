const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.question = !isEmpty(data.question) ? data.question : "";
  data.answer = !isEmpty(data.answer) ? data.answer : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Password confirmation checks
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters and at most 30 characters";
  }

  if (!Validator.matches(data.password, '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/', 'i')){
    errors.password = "Password must contain at least one uppercase, at least one lower case, and at least one special character"
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // security question checks
  if (Validator.isEmpty(data.question)) {
    errors.question = "Security question is required";
  }

  // security question answer checks
  if (Validator.isEmpty(data.answer)) {
    errors.answer = "Answer to security question is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
