import React, { useState } from "react";
import { compose } from "recompose";
import { withRouter, Redirect, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";

import Login from "../../components/Login/Login";
import Search from "../../components/Search/Search";
import FindBuddies from "../../components/FindBuddies/FindBuddies";

function Home() {
  const [searchMode, setSearchMode] = useState(false);
  const [buddiesMode, setBuddiesMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function handleSearchClick() {
    setBuddiesMode(false);
    setSearchMode(true);
  }

  function handleStudyBuddiesClick() {
    setSearchMode(false);
    setBuddiesMode(true);
  }

  return (
    <div>
      <Navbar className="border-bottom" variant="dark" bg="dark">
        <Navbar.Brand> CourseBuddy </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav 
            className="ml-auto"
            activeKey="/"
            onSelect={searchMode && <Search validUser={loggedIn} name={user} />}
          >
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <br />

      {!searchMode && !buddiesMode && (
        <div className="Home">
          {loggedIn && <div></div>}
          {!loggedIn && <Login signIn={setLoggedIn} setUsername={setUser} />}
        </div>
      )}
      {searchMode && <Search validUser={loggedIn} name={user} />}
      {buddiesMode && <FindBuddies validUser={loggedIn} name={user} />}

      {loggedIn && <Container fluid>
        <Row className="justify-content-md-center">
          <CardDeck>
            <Card className="searchButton" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://uofi.box.com/shared/static/e82hbhqn9i3xrgyv7p68bqr4m76smno1.png"
              />
              <Card.Body>
                <Card.Title>Search for Classes!</Card.Title>
                <Button
                  className="HomeButton"
                  onClick={handleSearchClick}
                  variant="primary"
                >
                  Search
                </Button>
              </Card.Body>
            </Card>
            <Card className="findBuddies" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://uofi.box.com/shared/static/7n1f8gfl6mnpms3t9euvr3a9y9m7m97q.jpg"
              />
              <Card.Body>
                <Card.Title>Find Study Buddies!</Card.Title>
                <Button
                  className="HomeButton"
                  onClick={handleStudyBuddiesClick}
                  variant="primary"
                >
                  Search
                </Button>
              </Card.Body>
            </Card>
          </CardDeck>
        </Row>
      </Container>}
    </div>
  );
}

export default compose(withRouter)(Home);
