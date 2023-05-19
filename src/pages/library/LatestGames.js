import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const LatestGames = (props) => {
  return (
    <>
      {props.games.slice(0, 5).map((game, id) => {
        return (
          <Card border="primary" key={id}>
            <Card.Body>
              <Card.Title className="text-primary">{game.title}</Card.Title>
              <Row>
                <Col className="m-1">Min Players: {game.minplayers}</Col>
                <Col className="m-1">Max Players: {game.maxplayers}</Col>
              </Row>
              <Row>
                <Col className="m-1">Tags: {game.tags}</Col>
                <Col className="m-1">Time to play: {game.playtime} minutes</Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default LatestGames;
