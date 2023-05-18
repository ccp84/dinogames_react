import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import GameList from "./library/GameList";
import { Col, Row, Container } from "react-bootstrap";

const LandingPage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <h1>Welcome {currentUser?.firstname}</h1>
      <Container className="m-2">
        <Row>
          <Col s={12} md={6} lg={4}>
            News
          </Col>
          <Col s={12} md={6} lg={4}>
            <GameList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;
