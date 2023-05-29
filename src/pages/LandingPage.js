import React from "react";
import GameList from "./library/GameList";
import { Card, Col, Row } from "react-bootstrap";

const LandingPage = () => {
  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Header className="text-primary">
          <Card.Title className="text-primary">
            <h1>Welcome to the Dinosaur Tabletop Games Library</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Please use the library search features to find your next favourite
            game. We hope to see you at an event soon.
          </Card.Text>
        </Card.Body>
      </Card>
      <Row>
        <Col s={12} md={12} lg={4}>
          <h2>News</h2>
          <>
            <Card className="m-1" border="primary">
              <Card.Header className="text-primary">
                <Card.Title className="text-primary">News Title</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>News items coming soon</Card.Text>
              </Card.Body>
            </Card>
          </>
        </Col>
        <Col s={12} md={6} lg={4}>
          <h2>Latest Games</h2>
          <>
            <GameList list="latest" filter="?ordering=-id" />
          </>
        </Col>
        <Col s={12} md={6} lg={4}>
          <h2>Latest Requests</h2>
          <>
            <Card className="m-1" border="primary">
              <Card.Header className="text-primary">
                <Card.Title className="text-primary">
                  Requested Games
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Game requests coming soon</Card.Text>
              </Card.Body>
            </Card>
          </>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
