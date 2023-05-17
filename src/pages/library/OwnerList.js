import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

const OwnerList = () => {
  const [listDetails, setListDetails] = useState({
    games: [],
  });

  const { games } = listDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["ownerData"],
    queryFn: () => axiosReq.get("/games/owner/").then((res) => res.data),
    onSuccess: (data) => setListDetails({ games: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card border="primary">
        <Card.Body>
          <Card.Title className="text-primary">Owned Games</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {games.map((game, id) => {
            return (
              <ListGroup.Item key={id}>
                <Row>
                  <Col>{game.title}</Col>
                  <Col>
                    <Button variant="info">Edit</Button>
                  </Col>
                  <Col>
                    <Button variant="info">Delete</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Card.Body>
          <Button variant="info" href="/game/create">
            Add Game
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default OwnerList;
