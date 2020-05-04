import React, { useState } from "react";

import SearchInfo from "../SearchInfo/SearchInfo";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

import axios from "axios";
import { STUDY_GROUP_API_URL } from "../../constants";

function FindBuddies(props) {
    const [email, setEmail] = useState("");
    const [grade, setGrade] = useState("");
    const [major, setMajor] = useState("");
    const [courses, setCourses] = useState(
        {
            1: null, 
            2: null,
            3: null,
            4: null,
            5: null,
            6: null
        }
    );
    const [infoFilled, setInfoFilled] = useState(false);
    const [preferences, setPreferences] = useState({
      1: null,
      2: null, 
      3: null
    });

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function selectGrade(eventKey, event) {
      setGrade(eventKey);
  }

    function selectMajor(eventKey, event) {
        setMajor(eventKey);
    }

    const majorList = {
        0: "Accounting",
        1: "Biology",
        2: "Business Administration",
        3: "Chemistry",
        4: "CS",
        5: "CS + Math",
        6: "CS + Statistics",
        7: "Economics",
        8: "Finance",
        9: "Microcellular Biology",
        10: "Music"
    }

    function selectCourse1(event) {
        let tempCourses = courses;
        tempCourses[1] = event.target.value;
        setCourses(tempCourses);
    }
    function selectCourse2(event) {
        let tempCourses = courses;
        tempCourses[2] = event.target.value;
        setCourses(tempCourses);
    }
    function selectCourse3(event) {
        let tempCourses = courses;
        tempCourses[3] = event.target.value;
        setCourses(tempCourses);
    }
    function selectCourse4(event) {
        let tempCourses = courses;
        tempCourses[4] = event.target.value;
        setCourses(tempCourses);
    }
    function selectCourse5(event) {
        let tempCourses = courses;
        tempCourses[5] = event.target.value;
        setCourses(tempCourses);
    }
    function selectCourse6(event) {
        let tempCourses = courses;
        tempCourses[6] = event.target.value;
        setCourses(tempCourses);
    }

    function selectPreference1(eventKey, event) {
      let tempPreferences = preferences;
      tempPreferences[1] = eventKey;
      setPreferences(tempPreferences);
    }
    function selectPreference2(eventKey, event) {
      let tempPreferences = preferences;
      tempPreferences[2] = eventKey;
      setPreferences(tempPreferences);
    }
    function selectPreference3(eventKey, event) {
      let tempPreferences = preferences;
      tempPreferences[3] = eventKey;
      setPreferences(tempPreferences);
    }

    function handleInfoSubmit() {
      if (email.length == 0 || grade.length == 0 || props.name.length == 0 || major.length == 0) {
        return;
      }
      for (var key in courses) {
        if (courses[key] && courses[key].length > 0) {
          axios
            .post(STUDY_GROUP_API_URL, {
              username: props.name,
              email: email,
              year: grade,
              major: major,
              crn: courses[key],
            })
            .then(
              (response) => {
                console.log(response.status)
                setInfoFilled(true);
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    }

    function handleFindBuddiesSubmit() {
      for (var key in courses) {
        if (courses[key] && courses[key].length > 0) {
          // Temporary
          console.log(key);
        }
      }
    }

    return (
        <div className="Search">
          <Container fluid>
            <h1>Find Study Buddies</h1>
            {props.name && <h2>Your Info ({props.name}): </h2>}
            {!props.name && <h2>Your Info: </h2>}
            <Row className="justify-content-md-center">
              <Form>
                <Form.Row>
                  <Dropdown onSelect={selectGrade}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Grade
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Freshman">Freshman</Dropdown.Item>
                        <Dropdown.Item eventKey="Sophomore">Sophomore</Dropdown.Item>
                        <Dropdown.Item eventKey="Junior">Junior</Dropdown.Item>
                        <Dropdown.Item eventKey="Senior">Senior</Dropdown.Item>
                        <Dropdown.Item eventKey="Masters">Masters</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control
                      type="text"
                      name="email"
                      onChange={handleEmailChange}
                      placeholder="coursebuddies@coursebuddies.com"
                    />
                  </Form.Group>
                  <Dropdown onSelect={selectMajor}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Major
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey={majorList[0]}>{majorList[0]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[1]}>{majorList[1]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[2]}>{majorList[2]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[3]}>{majorList[3]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[4]}>{majorList[4]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[5]}>{majorList[5]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[6]}>{majorList[6]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[7]}>{majorList[7]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[8]}>{majorList[8]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[9]}>{majorList[9]}</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </Form.Row>
              </Form>
            </Row>
            <Row className="justify-content-md-center">
                <Form>
                    <Form.Row>
                        <Form.Group controlId="formGridEmail">
                            <Form.Control
                            type="number"
                            name="CRN1"
                            onChange={selectCourse1}
                            placeholder="CRN (e.g. 31352)"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Control
                            type="number"
                            name="CRN2"
                            onChange={selectCourse2}
                            placeholder="CRN (e.g. 31352)"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Control
                            type="number"
                            name="CRN3"
                            onChange={selectCourse3}
                            placeholder="CRN (e.g. 31352)"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Control
                            type="number"
                            name="CRN4"
                            onChange={selectCourse4}
                            placeholder="CRN (e.g. 31352)"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Control
                            type="number"
                            name="CRN5"
                            onChange={selectCourse5}
                            placeholder="CRN (e.g. 31352)"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Control
                            type="number"
                            name="CRN6"
                            onChange={selectCourse6}
                            placeholder="CRN (e.g. 31352)"
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Row>
            <Row className="justify-content-md-center">
              <Button
                onClick={handleInfoSubmit}
                className="SearchButton"
                variant="primary"
                type="submit"
              >
                {" "}
                Submit Your Info{" "}
              </Button>
            </Row>
            {infoFilled && <h2>Rank Preferences by Priority: </h2>}
            {infoFilled && <Row className="justify-content-md-center">
              <Dropdown onSelect={selectPreference1}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preference 1:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Grade">Grade</Dropdown.Item>
                  <Dropdown.Item eventKey="Major">Major</Dropdown.Item>
                  <Dropdown.Item eventKey="CRN">CRN</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={selectPreference2}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preference 2:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Grade">Grade</Dropdown.Item>
                  <Dropdown.Item eventKey="Major">Major</Dropdown.Item>
                  <Dropdown.Item eventKey="CRN">CRN</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={selectPreference3}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preference 3:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Grade">Grade</Dropdown.Item>
                  <Dropdown.Item eventKey="Major">Major</Dropdown.Item>
                  <Dropdown.Item eventKey="CRN">CRN</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>}
            {infoFilled && <Row className="justify-content-md-center">
              <Button
                onClick={handleFindBuddiesSubmit}
                className="SearchButton"
                variant="primary"
                type="submit"
              >
                {" "}
                Find Study Buddies!{" "}
              </Button>
            </Row>}
          </Container>
          <br />
        </div>
    );
}

export default FindBuddies;