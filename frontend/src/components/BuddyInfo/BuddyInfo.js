import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import BuddyInfoSection from "../BuddyInfoSection/BuddyInfoSection";

function BuddyInfo(props) {
  function displaySection(user) {
    return <BuddyInfoSection email={user.email} major={user.major} username={user.username} grade={user.year} />;
  }

  return (
    <Container className="p-0" fluid={true}>
      <Navbar className="border-bottom" variant="dark" bg="dark">
      </Navbar>
      <div>{props.results.map(displaySection)}</div>
    </Container>
  );
}

export default BuddyInfo;