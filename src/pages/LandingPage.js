import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import GameList from "./library/GameList";
import { Card, Col, Row } from "react-bootstrap";

const LandingPage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <h1>Welcome {currentUser?.firstname}</h1>
      <Row>
        <Col s={12} md={6}>
          <h2>News</h2>
          <>
            <Card className="m-1" border="primary">
              <Card.Header className="text-primary">
                <Card.Title className="text-primary">News Title</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>News Text</Card.Text>
              </Card.Body>
            </Card>
          </>
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
