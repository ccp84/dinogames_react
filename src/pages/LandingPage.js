import React from "react";
import GameList from "./library/GameList";
import { Card, Col, Row } from "react-bootstrap";
import LatestNews from "./news/LatestNews";

const LandingPage = () => {
  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Header className="text-primary">
          <Card.Title className="text-primary">
            <h1>Welcome to the Dinosaur Games Library</h1>
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
          <h2>Latest News</h2>
          <>
            <LatestNews />
          </>
        </Col>
        <Col s={12} md={6} lg={4}>
          <h2>Latest Games</h2>
          <>
            <GameList list="latest" filter="?ordering=-id" />
          </>
        </Col>
        <Col s={12} md={6} lg={4}>
          <h2>About</h2>
          <>
            <Card className="m-1" border="primary">
              <Card.Body>
                <Card.Text>
                  Welcome to the Dinosaur Games Library. A resource for all
                  types of tabletop games. Please use the library search
                  features to find a game to play.
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
