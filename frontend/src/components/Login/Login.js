import React, { useState } from "react";
import "./Login.css";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

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
    <div>
      <Jumbotron className = "Login">
        <Container fluid={true}>
        <div>
          <h1>
            Login
          </h1>
        </div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group controlId="logInUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="login_user" onChange={handleLoginUsernameChange}placeholder="Username " />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="logInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="login_pw" onChange={handleLoginPasswordChange}placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleLoginSubmit} className="SubmitButton">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>
      </Jumbotron>

      <Jumbotron className = "SignUp">
        <Container fluid={true}>
        <div>
          <h1>
            Sign Up
          </h1>
        </div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group controlId="signUpUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="signup_user" onChange={handleSignupUsernameChange} placeholder = "Username"/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="signUpPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="signup_pw" onChange={handleSignupPasswordChange} placeholder = "Password"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSignupSubmit} className="SubmitButton">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Login;
