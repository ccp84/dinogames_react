import { useQueries } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Card, CardGroup } from "react-bootstrap";
import ReviewList from "../reviews/ReviewList";

const GameDetail = () => {
  const [gameDetails, setGameDetails] = useState({ game: "" });
  const [reviews, setReviews] = useState({
    allReviews: [],
  });
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const { game } = gameDetails;
  const { allReviews } = reviews;

  const { isLoading, error } = useQueries({
    queries: [
      {
        queryKey: ["gameData"],
        queryFn: () => axiosReq.get(`/games/${id}`).then((res) => res.data),
        onSuccess: (data) => setGameDetails({ game: data }),
      },
      {
        queryKey: ["reviewData"],
        queryFn: () =>
          axiosReq.get(`/reviews/?author=&game=${id}`).then((res) => res.data),
        onSuccess: (data) => setReviews({ allReviews: data }),
      },
    ],
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
          <Card.Text>{game.overview}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title className="text-primary">
            Reviews
            <>
              {currentUser ? (
                <Button className="m-2" variant="info">
                  Add Review
                </Button>
              ) : (
                <Link to="/signin">
                  <Button className="m-2" variant="info">
                    Sign in to Review
                  </Button>
                </Link>
              )}
            </>
          </Card.Title>
          <ReviewList reviews={allReviews} />
        </Card.Body>
        {currentUser ? (
          <>
            <Card.Footer>
              {currentUser?.is_staff ? (
                <>
                  <Link to="/game/edit" state={{ prop: game }}>
                    <Button className="m-1" variant="info">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    className="m-1"
                    variant="danger"
                    onClick={async () => {
                      try {
                        await axiosReq.delete(`/games/edit/${game.id}`);
                        navigate("/game/library");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
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
