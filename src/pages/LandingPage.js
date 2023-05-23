import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import GameList from "./library/GameList";
import { Col, Row } from "react-bootstrap";

const LandingPage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <h1>Welcome {currentUser?.firstname}</h1>
      <Row>
        <Col s={12} md={6}>
          <h2>News</h2>
        </Col>
        <Col s={12} md={6}>
          <h2>Latest Games</h2>
          <>
            <GameList list="latest" filter="?ordering=-id" />
          </>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
