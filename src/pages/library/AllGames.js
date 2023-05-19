import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const AllGames = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Card className="m-2" border="primary">
            Search and Filter
          </Card>
        </Col>
      </Row>
      <Row>
        {props.games.map((game, id) => {
          return (
            <Col s={12} md={6} lg={4} key={id}>
              <Card className="m-2" border="primary">
                <Card.Header>
                  <Card.Title className="text-primary">
                    {game.title} | Owner {game.owner}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Row>Min Players: {game.minplayers}</Row>
                      <Row>Max Players: {game.maxplayers}</Row>
                      <Row>Time to play:</Row>
                      <Row>{game.playtime} minutes</Row>
                    </Col>
                    <Col>
                      <Row>Tags: {game.tags}</Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Card.Title className="text-primary">Reviews</Card.Title>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default AllGames;
