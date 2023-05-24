import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Button,
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const GameDetail = () => {
  const [gameDetails, setGameDetails] = useState({ game: "" });
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const { game } = gameDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["gameData"],
    queryFn: () => axiosReq.get(`/games/${id}`).then((res) => res.data),
    onSuccess: (data) => setGameDetails({ game: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card className="m-2" border="primary">
        <Card.Header>
          <Card.Title className="text-primary">
            <h1>{game.title}</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card classname="m-2" border="primary">
              <Card.Body>Min Players: {game.minplayers}</Card.Body>
            </Card>
            <Card classname="m-2" border="primary">
              <Card.Body>Max Players: {game.maxplayers}</Card.Body>
            </Card>
            <Card classname="m-2" border="primary">
              <Card.Body>Time to play: {game.playtime} minutes</Card.Body>
            </Card>
            <Card classname="m-2" border="primary">
              <Card.Body>Tags: {game.tags}</Card.Body>
            </Card>
          </CardGroup>
        </Card.Body>
        <Card.Body>
          <Card.Title className="text-primary">Game Overview</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Body>
          <ListGroup>
            <Card.Title className="text-primary">Reviews</Card.Title>
            <ListGroupItem>Feature coming soon</ListGroupItem>
          </ListGroup>
        </Card.Body>
        {currentUser ? (
          <>
            <Card.Footer>
              {currentUser ? (
                <>
                  <Button className="m-1" variant="info">
                    Review
                  </Button>
                </>
              ) : (
                ""
              )}
              {currentUser?.is_staff ? (
                <>
                  <Link to="/game/edit" state={{ prop: game }}>
                    <Button className="m-1" variant="info">
                      Edit
                    </Button>
                  </Link>
                  <Button className="m-1" variant="danger">
                    Delete
                  </Button>
                </>
              ) : (
                ""
              )}
            </Card.Footer>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default GameDetail;
