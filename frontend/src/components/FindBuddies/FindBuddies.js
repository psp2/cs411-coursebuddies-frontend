import React, { useState, useEffect } from "react";

import BuddyInfo from "../BuddyInfo/BuddyInfo";
import PersonalInfoSection from "../PersonalInfoSection/PersonalInfoSection";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

import axios from "axios";
//import { STUDY_GROUP_API_URL } from "../../constants";
import { STUDY_BUDDY_API_URL } from "../../constants";
import { USER_REGISTRATION_API } from "../../constants";

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
    const [courseName, setCourseName] = useState(
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
    const [courseForBuddySearch, setCourseForBuddySearch] = useState(null);
    const [preferences, setPreferences] = useState({
      1: null,
      2: null, 
      3: null
    });
    const [studyBuddyResults, setStudyBuddyResults] = useState();

    useEffect(() => {
      displayCourses();
    }, []);

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
        1: "Actuarial Science",
        2: "Advertising",
        3: "Aerospace Engineering",
        4: "African American Studies",
        5: "Animal Sciences",
        6: "Anthropology",
        7: "Biology",
        8: "Business Administration",
        9: "Chemistry",
        10: "Crop Sciences",
        11: "CS",
        12: "CS + Astronomy",
        13: "CS + Chemistry",
        14: "CS + Linguistics",
        15: "CS + Math",
        16: "CS + Statistics",
        17: "Dance",
        18: "Economics",
        19: "Finance",
        20: "IB",
        21: "Mathematics",
        22: "Microcellular Biology",
        23: "Music",
        24: "Physics",
        25: "Psychology",
        26: "Religion",
        27: "Sociology",
        28: "Statistics",
        29: "Urban Studies & Planning"
    }

    function displayCourses() {
      axios
        .get(USER_REGISTRATION_API, {
          params: {
            username: props.name,
          },
        })
        .then(
          (response) => {
            if (response.status == 200 && response.data.length > 0) {
              setMajor(response.data[0].major);
              setEmail(response.data[0].email);
              setGrade(response.data[0].year);
              for(var i = 1; i <= 6 && i <= response.data.length; i++) {
                let tempCourses = courses;
                tempCourses[i] = response.data[i-1].crn;
                setCourses(tempCourses);
                let tempCourseName = courseName;
                tempCourseName[i] = response.data[i-1].subject + parseInt(response.data[i-1].course);
                setCourseName(tempCourseName);
              }
              setInfoFilled(true);
            }
          },
          (error) => {
            console.log(error);
          }
        );
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

    function selectCourseForBuddySearch(eventKey, event) {
      setCourseForBuddySearch(eventKey);
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
            .post(USER_REGISTRATION_API, {
              username: props.name,
              email: email,
              year: grade,
              major: major,
              crn: courses[key],
            })
            .then(
              (response) => {
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
      if (courseForBuddySearch && courses[courseForBuddySearch] && preferences[1] && preferences[2] && preferences[3]) {
        let username = props.name;
        let crn = parseInt(courses[courseForBuddySearch]);
        axios
          .get(STUDY_BUDDY_API_URL, {
            params: {
              username: username,
              crn: crn,
              first_pref: preferences[1],
              second_pref: preferences[2],
              third_pref: preferences[3],
            },
          })
          .then(
            (response) => {
              if (response.status == 200) {
                setStudyBuddyResults(response.data);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }

    return (
        <div className="Search">
          <Container fluid>
            <h1>Find Study Buddies</h1>
            {infoFilled && <h2>Your Info ({props.name}): </h2>}
            {infoFilled && <PersonalInfoSection username={props.name} email={email} major={major} grade={grade} courses={courses} />}
            {!infoFilled && <h2>Your Info ({props.name}): </h2>}
            {!infoFilled && <Row className="justify-content-md-center">
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
                        <Dropdown.Item eventKey={majorList[10]}>{majorList[10]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[11]}>{majorList[11]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[12]}>{majorList[12]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[13]}>{majorList[13]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[14]}>{majorList[14]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[15]}>{majorList[15]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[16]}>{majorList[16]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[17]}>{majorList[17]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[18]}>{majorList[18]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[19]}>{majorList[19]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[20]}>{majorList[20]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[21]}>{majorList[21]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[22]}>{majorList[22]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[23]}>{majorList[23]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[24]}>{majorList[24]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[25]}>{majorList[25]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[26]}>{majorList[26]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[27]}>{majorList[27]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[28]}>{majorList[28]}</Dropdown.Item>
                        <Dropdown.Item eventKey={majorList[29]}>{majorList[29]}</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </Form.Row>
              </Form>
            </Row>}
            {!infoFilled && <Row className="justify-content-md-center">
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
            </Row>}
            {!infoFilled && <Row className="justify-content-md-center">
              <Button
                onClick={handleInfoSubmit}
                className="SearchButton"
                variant="primary"
                type="submit"
              >
                {" "}
                Submit Your Info{" "}
              </Button>
            </Row>}
            {infoFilled && <Row className="justify-content-md-center">
              <Button
                onClick={() => setInfoFilled(false)}
                className="SearchButton"
                variant="primary"
                type="submit"
              >
                {" "}
                Edit Your Info{" "}
              </Button>
            </Row>}
            {infoFilled && <h2>Select Class and Rank Preferences: </h2>}
            {infoFilled && <Row className="justify-content-md-center">
              <Dropdown onSelect={selectCourseForBuddySearch}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Target Class:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey={1}>{courses[1]} {courseName[1]}</Dropdown.Item>
                  <Dropdown.Item eventKey={2}>{courses[2]} {courseName[2]}</Dropdown.Item>
                  <Dropdown.Item eventKey={3}>{courses[3]} {courseName[3]}</Dropdown.Item>
                  <Dropdown.Item eventKey={4}>{courses[4]} {courseName[4]}</Dropdown.Item>
                  <Dropdown.Item eventKey={5}>{courses[5]} {courseName[5]}</Dropdown.Item>
                  <Dropdown.Item eventKey={6}>{courses[6]} {courseName[6]}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={selectPreference1}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preference 1:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Year">Grade</Dropdown.Item>
                  <Dropdown.Item eventKey="Major">Major</Dropdown.Item>
                  <Dropdown.Item eventKey="CRN">Class</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={selectPreference2}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preference 2:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Year">Grade</Dropdown.Item>
                  <Dropdown.Item eventKey="Major">Major</Dropdown.Item>
                  <Dropdown.Item eventKey="CRN">Class</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={selectPreference3}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preference 3:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Year">Grade</Dropdown.Item>
                  <Dropdown.Item eventKey="Major">Major</Dropdown.Item>
                  <Dropdown.Item eventKey="CRN">Class</Dropdown.Item>
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
            {studyBuddyResults && infoFilled && <BuddyInfo results={studyBuddyResults}/>}
          </Container>
          <br />
        </div>
    );
}

export default FindBuddies;