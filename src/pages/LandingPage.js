import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import GameList from "./library/GameList";
import { Col, Row, Button } from "react-bootstrap";

const LandingPage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <h1>Welcome {currentUser?.firstname}</h1>
      <Row>
        <Col s={12} md={12} lg={4}>
          <h2>News</h2>
        </Col>
        <Col s={12} md={6} lg={4}>
          <h2>Latest Games</h2>
          {currentUser ? (
            <>
              <GameList list="latest" />
              <Button className="m-2" variant="info" href="/game/library">
                View Library
              </Button>
            </>
          ) : (
            "Please log in to view the latest games"
          )}
        </Col>
        <Col s={12} md={6} lg={4}>
          <h2>Social Events</h2>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
