import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const UserRatings = () => {
  const [ratings, setRatings] = useState({
    myGames: [],
  });
  const currentUser = useCurrentUser();
  const { myGames } = ratings;
  const { isLoading, error } = useQuery({
    queryKey: ["ratingData"],
    queryFn: () =>
      axiosReq
        .get(`/ratings/?game=&author=${currentUser.id}`)
        .then((res) => res.data),
    onSuccess: (data) => setRatings({ myGames: data }),
  });
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Body>
          <Card.Title className="text-primary">
            Games I like
            <>
              <FontAwesomeIcon
                className="text-success m-1"
                icon={`fa-solid fa-thumbs-up`}
              />
            </>
          </Card.Title>
        </Card.Body>
        <Card.Body>
          <ListGroup>
            {myGames.length ? (
              // myGames has length greater than 0
              <>
                {myGames.map((game) => {
                  return (
                    <>
                      {game.rating ? (
                        //   Rating is true - thumbs up
                        <>
                          <ListGroupItem key={game.id}>
                            <Link to={`/game/${game.id}`}>
                              {game.game_title}
                            </Link>
                          </ListGroupItem>
                        </>
                      ) : // rating is false - thumbs down
                      null}
                    </>
                  );
                })}
              </>
            ) : (
              // myGames is empty
              <>
                <ListGroupItem>No games liked yet</ListGroupItem>
              </>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserRatings;
