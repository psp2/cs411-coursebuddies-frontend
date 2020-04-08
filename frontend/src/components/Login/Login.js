import React, { useState } from "react";
import "./Login.css";

function Login(props) {
  // Implemented without Auth / Security. Would need to be added for real application.
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPass, setSignupPass] = useState("");

  function handleLoginUsernameChange(event) {
    setLoginName(event.target.value);
  }

  function handleLoginPasswordChange(event) {
    setLoginPass(event.target.value);
  }

  function handleLoginSubmit() {
    console.log(
      "Handle login submit here... take care of this once API is set up!"
    );
    // Once API is set up, we'll check if the PW matched the DB before doing the following
    props.signIn(true);
    props.setUsername(loginName);
  }

  function handleSignupUsernameChange(event) {
    setSignupName(event.target.value);
  }

  function handleSignupPasswordChange(event) {
    setSignupPass(event.target.value);
  }

  function handleSignupSubmit() {
    console.log(
      "Handle signup submit here... take care of this once API is set up!"
    );
    // Once API is set up, we'll add username / pass to DB before doing the following
    props.signIn(true);
    props.setUsername(signupName);
  }

  return (
    <div className="Login">
      <div className="MiddleSection"> Log In </div>

      <div className="FormSection">
        <div className="LoginContent">
          <label>
            Username:
            <input
              type="text"
              name="login_user"
              onChange={handleLoginUsernameChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="login_pw"
              onChange={handleLoginPasswordChange}
            />
          </label>
        </div>
        <button onClick={handleLoginSubmit} className="SubmitButton">
          Submit
        </button>
      </div>
      <div className="MiddleSection"> Sign Up </div>
      <div className="FormSection">
        <div className="LoginContent">
          <label>
            Username:
            <input
              type="text"
              name="signup_user"
              onChange={handleSignupUsernameChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="signup_pw"
              onChange={handleSignupPasswordChange}
            />
          </label>
        </div>
        <button onClick={handleSignupSubmit} className="SubmitButton">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
