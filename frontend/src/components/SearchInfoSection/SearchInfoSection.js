import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { PROF_USER_RATING_API_URL } from "../../constants";
import { ADD_USER_RATING_API_URL } from "../../constants";
import { UPDATE_USER_RATING_API_URL } from "../../constants";
import { DELETE_USER_RATING_API_URL } from "../../constants";
import { USER_RATING_API_URL } from "../../constants";
import { STUDY_BUDDY_API_URL } from "../../constants";

function SearchInfoSection(props) {
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [myRating, setMyRating] = useState(null);

  var ratings_count = 0;
  var total_val = 0;

  function getRatings() {
    axios
      .get(PROF_USER_RATING_API_URL, {
        params: {
          username: props.username,
          crn: props.section["crn"],
        },
      })
      .then(
        (response) => {
          if (response.status == 200) {
            //ratings_count += response.data.length;
            //for (var item in response.data) {
              //if (response.data[item]["username"] == props.username) {
              //  setMyRating(response.data[item]["professor_ratings"]);
              //}
              //total_val += response.data[item]["professor_ratings"];
            //}
            setAvgRating(response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function getMyRatings() {
    axios
      .get(USER_RATING_API_URL, {
        params: {
          username: props.username,
          crn: props.section["crn"],
        },
      })
      .then(
        (response) => {
          if (response.status == 200) {
            //ratings_count += response.data.length;
            //for (var item in response.data) {
              //if (response.data[item]["username"] == props.username) {
              //  setMyRating(response.data[item]["professor_ratings"]);
              //}
              //total_val += response.data[item]["professor_ratings"];
            //}
            setMyRating(response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }


  getRatings();
  getMyRatings();
  

  function changeUserRating(event) {
    setUserRating(event.target.value);
  }

  function addRating() {
    axios
      .post(ADD_USER_RATING_API_URL, {
        //params: {
          username: props.username,
          crn: props.section["crn"],
          professor_ratings: userRating,
          difficulty: 3,
        //},
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status == 201) {
            getRatings();
            getMyRatings();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function updateRating() {
    axios
      .get(UPDATE_USER_RATING_API_URL, {
        params: {
          username: props.username,
          crn: props.section["crn"],
          rating: userRating,
        },
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status == 201) {
            getRatings();
            getMyRatings();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function deleteRating() {
    axios
      .get(DELETE_USER_RATING_API_URL, {
        params: {
          username: props.username,
          crn: props.section["crn"],
        },
      })
      .then(
        (response) => {
          if (response.status == 201) {
            getRatings();
            setMyRating(null);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

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
              {!myRating && (
                <div>
                  <Form.Control
                    type="text"
                    name="user_rating"
                    onChange={changeUserRating}
                    placeholder="1-5"
                  />
                  <Button onClick={addRating}>SUBMIT</Button>
                </div>
              )}
              {myRating && (
                <div>
                  <div>
                    <b> My Rating: </b> {myRating}
                  </div>
                  <div>
                    <Form.Control
                      type="text"
                      name="user_rating"
                      onChange={changeUserRating}
                      placeholder="1-5"
                    />
                    <Button onClick={updateRating}>UPDATE MY RATING</Button>
                  </div>
                  <div>
                    <Button onClick={deleteRating}>DELETE MY RATING</Button>
                  </div>
                </div>
              )}
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
