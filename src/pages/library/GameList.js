import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";

const GameList = () => {
  const [listDetails, setListDetails] = useState({
    games: [],
  });

  const { games } = listDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["libraryData"],
    queryFn: () => axiosReq.get("/games/").then((res) => res.data),
    onSuccess: (data) => setListDetails({ games: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1>Latest Games</h1>
      {games.map((game, id) => {
        return (
          <Card border="primary" key={id}>
            <Card.Body>
              <Card.Title className="text-primary">{game.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Tags: {game.tags}</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Min Players: {game.minplayers}</Col>
                  <Col>Max Players: {game.maxplayers}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                Time to play: {game.playtime} minutes
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Title>Owner: {game.owner}</Card.Title>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default GameList;
