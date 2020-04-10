import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import axios from "axios";
import { LOGIN_API_URL } from "../../constants";

function Login(props) {
  // Implemented without Auth / Security. Would need to be added for real application.
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPass, setSignUpPass] = useState("");

  function handleLoginUsernameChange(event) {
    setLoginName(event.target.value);
  }

  function handleLoginPasswordChange(event) {
    setLoginPass(event.target.value);
  }

  function handleLoginSubmit() {
    axios
      .get(LOGIN_API_URL, {
        params: {
          username: loginName,
          password: loginPass,
        },
      })
      .then(
        (response) => {
          if (response.status && response.status == 200) {
            console.log(response.status);
            props.signIn(true);
            props.setUsername(loginName);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    props.signIn(true);
    props.setUsername(loginName);
  }

  function handleSignUpUsernameChange(event) {
    setSignUpName(event.target.value);
  }

  function handleSignUpPasswordChange(event) {
    setSignUpPass(event.target.value);
  }

  function handleSignUpSubmit() {
    axios
      .post(LOGIN_API_URL, {
        username: signUpName,
        password: signUpPass,
      })
      .then(
        (response) => {
          console.log(response.status);
          props.signIn(true);
          props.setUsername(signUpName);
        },
        (error) => {
          console.log(error);
        }
      );
    props.signIn(true);
    props.setUsername(signUpName);
  }

  return (
    <div>
      <Jumbotron className="Login">
        <Container fluid={true}>
          <div>
            <h1>Login</h1>
          </div>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Group controlId="logInUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="login_user"
                    onChange={handleLoginUsernameChange}
                    placeholder="Username "
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="logInPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="login_pw"
                    onChange={handleLoginPasswordChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleLoginSubmit}
                  className="SubmitButton"
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Jumbotron className="SignUp">
        <Container fluid={true}>
          <div>
            <h1>Sign Up</h1>
          </div>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Group controlId="signUpUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="signup_user"
                    onChange={handleSignUpUsernameChange}
                    placeholder="Username"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="signUpPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="signup_pw"
                    onChange={handleSignUpPasswordChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSignUpSubmit}
                  className="SubmitButton"
                >
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
