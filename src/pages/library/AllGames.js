import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const AllGames = (props) => {
  return (
    <>
      {props.games.map((game, id) => {
        return (
          <Card className="m-2" border="primary" key={id}>
            <Card.Body>
              <Card.Title className="text-primary">{game.title}</Card.Title>
              <Row>
                <Col>Min Players: {game.minplayers}</Col>
                <Col>Max Players: {game.maxplayers}</Col>
              </Row>
              <Row>
                <Col>Tags: {game.tags}</Col>
                <Col>Time to play: {game.playtime} minutes</Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default AllGames;
