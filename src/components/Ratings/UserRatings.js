import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SolidIcon from "../../components/icons/SolidIcon";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import HeaderContainer from "../Layout/HeaderContainer";

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
        .get(`/ratings/?game=&author=${currentUser.id}&rating=true`)
        .then((res) => res.data),
    onSuccess: (data) => setRatings({ myGames: data }),
  });
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <HeaderContainer
        titleContent={
          <>
            Games I like
            <>
              <SolidIcon className="text-success m-1" iconName="thumbs-up" />
            </>
          </>
        }
        bodyContent={
          <>
            <ListGroup>
              {myGames.length ? (
                // myGames has length greater than 0
                <>
                  {myGames.map((game) => {
                    return (
                      <ListGroupItem key={game.id}>
                        <Link to={`/game/${game.game}`}>{game.game_title}</Link>
                      </ListGroupItem>
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
          </>
        }
      />
    </>
  );
};

export default UserRatings;
