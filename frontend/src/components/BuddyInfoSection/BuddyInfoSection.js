import React from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BuddyInfoSection(props) {
    return(
        <div>
            <Jumbotron className="jumbotron-fluid">
                <Container fluid={true}>
                    <Row className="justify-content-center">
                        <Col className="block-example border-left border-dark">
                            <Row className="justify-content-center">
                                <b> Username: </b> 
                            </Row>
                            <Row className="justify-content-center">
                                {props.username}
                            </Row>
                        </Col>
                        <Col className="block-example border-left border-dark">
                            <Row className="justify-content-center">
                                <b> Email: </b> 
                            </Row>
                            <Row className="justify-content-center">
                                {props.email}
                            </Row>
                        </Col>
                        <Col className="block-example border-left border-dark">
                            <Row className="justify-content-center">
                                <b> Major: </b>
                            </Row>
                            <Row className="justify-content-center">
                                {props.major}
                            </Row>
                        </Col>
                        <Col className="block-example border-left border-dark">
                            <Row className="justify-content-center">
                                <b> Grade: </b>
                            </Row>
                            <Row className="justify-content-center">
                                {props.grade}
                            </Row>
                        </Col>
                        <Col className="block-example border-left border-dark">
                            <Row className="justify-content-center">
                                <b> CRN: </b>
                            </Row>
                            <Row className="justify-content-center">
                                {props.crn}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default BuddyInfoSection;