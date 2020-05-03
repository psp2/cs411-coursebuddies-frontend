import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SearchInfoSection from "../SearchInfoSection/SearchInfoSection";

function SearchInfo(props) {
  function displaySection(section) {
    return <SearchInfoSection section={section} username={props.username} />;
  }

  return (
    <Container className="p-0" fluid={true}>
      <Navbar className="border-bottom" variant="dark" bg="dark">
        <Navbar.Brand> CourseBuddy </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-toggle" />
      </Navbar>
      <div>{JSON.parse(props.results).map(displaySection)}</div>
    </Container>
  );
}

export default SearchInfo;
