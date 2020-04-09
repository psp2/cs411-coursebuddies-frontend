import React, { useState } from "react";
import "./Search.css";

import SearchInfo from "../SearchInfo/SearchInfo";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function Search(props) {
  const [subjectCode, setSubjectCode] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleSubjectChange(event) {
    setSubjectCode(event.target.value);
  }

  function handleCourseChange(event) {
    if (100 <= event.target.value <= 600) {
      setCourseNumber(event.target.value);
    }
  }

  function handleSubmit() {
    console.log(
      "Make API calls here, use subjectCode and courseNumber, and check if valid search!"
    );
    setSearchResults((searchResults) => [
      ...searchResults,
      "temporary results here!",
    ]);
  }

  return (
    <div className="Search">
      <Container fluid>
        <h1>
          Find your Class
        </h1>
        <Row className="justify-content-md-center">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control type="text" name="subject" onChange={handleSubjectChange} placeholder="Course Code (e.g CS)" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Control type="number" name="number" onChange={handleCourseChange} placeholder="Course Number (e.g 411)" />
                  </Form.Group>
              </Form.Row>
          </Form>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={handleSubmit} className="SearchButton" variant="primary" type="submit"> Search </Button>
          {searchResults.length > 0 && <SearchInfo results={searchResults} />}
        </Row>
      </Container>
      <br/>
    </div>

  );
}

export default Search;
