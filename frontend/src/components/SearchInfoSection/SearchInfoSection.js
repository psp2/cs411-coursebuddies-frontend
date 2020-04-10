import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { USER_RATING_API_URL } from "../../constants";

function SearchInfoSection(props) {
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  var ratings_count = 0;
  var total_val = 0;

  function getRatings() {
    axios
      .get(USER_RATING_API_URL, {
        params: {
          crn: props.section["crn"],
        },
      })
      .then(
        (response) => {
          if (response.status == 200) {
            ratings_count += response.data.length;
            for (var item in response.data) {
              total_val += response.data[item]["professor_ratings"];
            }
            setAvgRating(total_val / ratings_count);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function changeUserRating(event) {
    setUserRating(event.target.value);
  }

  function addRating() {
    axios
      .post(USER_RATING_API_URL, {
        username: props.username,
        crn: props.section["crn"],
        professor_ratings: userRating,
        difficulty: 3,
      })
      .then(
        (response) => {
          if (response.status == 200) {
            getRatings();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const avg_rating = getRatings();

  return (
    <div>
      <Jumbotron className="jumbotron-fluid">
        <Container fluid={true}>
          <Row className="justify-content-center">
            <Col className="block-example border-left border-dark">
              <p>
                <h3>Course Info: </h3>
                <br />
                <b> Class Name: </b> {props.section["coursetitle"]}
                <br />
                <b> Course Code: </b> {props.section["subject"]}
                <br />
                <b> CRN: </b> {props.section["crn"]}
                <br />
                <b>Professor Name: </b> {props.section["professor"]}
              </p>
            </Col>
            <Col className="block-example border-left border-dark ">
              <h3>Professor Rating: </h3> <p align="center"> {avgRating} </p>
              <Form.Control
                type="text"
                name="user_rating"
                onChange={changeUserRating}
                placeholder="1-5"
              />
              <Button onClick={addRating}>SUBMIT</Button>
            </Col>
            <Col className="block-example border-left border-dark">
              <h3>Average GPA: </h3>{" "}
              <p align="center"> {props.section["averagegpa"]} </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default SearchInfoSection;
