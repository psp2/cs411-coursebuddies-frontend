import React, { useState } from "react";
import "./Home.css";
import { compose } from "recompose";
import { withRouter, Redirect , Link} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';

import Login from "../../components/Login/Login";
import Search from "../../components/Search/Search";

function Home() {
  const [searchMode, setSearchMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function handleSearchClick() {
    setSearchMode(true);
  }

  function handleStudyBuddiesClick() {
    console.log("Handle Study Buddies... Later!");
  }

  return (
    <div>
      <Navbar className = "border-bottom" variant = "dark" bg = "dark">
        <Navbar.Brand> CourseBuddy </Navbar.Brand>
        <Navbar.Toggle aria-controls = "navbar-toggle" />
        <Navbar.Collapse id = "navbar-toggle">
          <Nav className = "ml-auto">
          <Link className = "nav-link"> Home </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <br/>

        {!searchMode && (
          <div className="Home">

            {loggedIn && (
              <div>
              </div>
            )}
            {!loggedIn && <Login signIn={setLoggedIn} setUsername={setUser} />}
          </div>
        )}
        {searchMode && <Search validUser={loggedIn} name={user} />}

  <Container fluid>
    <Row className ="justify-content-md-center">
    <CardDeck>
        <Card className = "searchButton" style={{ width: '18rem'}}>
          <Card.Img variant="top" src="https://www.computersciencedegreehub.com/wp-content/uploads/2019/03/university-of-illinois-at-urbana-champaign-300x122.png" />
          <Card.Body>
          <Card.Title>Search for Classes!</Card.Title>
          <Button className="HomeButton" onClick={handleSearchClick} variant="primary">Search</Button>
          </Card.Body>
        </Card>
        <Card className = "findBuddies" style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://i1.wp.com/hotheartoftexas.com/wp-content/uploads/2017/09/school-book-clipart-1.jpg?fit=800%2C486&ssl=1" />
          <Card.Body>
          <Card.Title>Find Study Buddies!</Card.Title>
          <Button className="HomeButton" onClick={handleStudyBuddiesClick} variant="primary">Search</Button>
          </Card.Body>
        </Card>
      </CardDeck>
    </Row>
  </Container>
      </div>
  );
}

export default compose(withRouter)(Home);
