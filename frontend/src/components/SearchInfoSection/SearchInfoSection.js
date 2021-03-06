import React, { useState, useEffect } from "react";

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
import { SITE_RATING_API_URL } from "../../constants";

function SearchInfoSection(props) {
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [webRating, setWebRating] = useState(null);

  useEffect(() => {
    getRatings();
    getMyRatings();
    getRMPRating();
  });

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
            setMyRating(response.data);
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
      .post(ADD_USER_RATING_API_URL, {
        username: props.username,
        crn: props.section["crn"],
        professor_ratings: userRating,
        difficulty: 3,
      })
      .then(
        (response) => {
          if (response.status == 201) {
            getRatings();
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
          if (response.status == 201) {
            getRatings();
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

  function getRMPRating() {
    axios
      .get(SITE_RATING_API_URL, {
        params: {
          professor: props.section["professor"]
        }
      })
      .then(
        (response) => {
          if (response.status == 200) {
            if(response.data.length == null) {
              setWebRating(response.data.professor_ratings)
            } else {
              setWebRating(response.data[0].professor_ratings)
            }
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
              {avgRating
                 ? <div>
                   <h3>Professor Rating: </h3> <p align="center"> {avgRating} </p>
                 </div>
                 :
                 <div>
                   <h3>Professor Rating: </h3> <p align="center"> {webRating} </p>
                 </div>
               }
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
