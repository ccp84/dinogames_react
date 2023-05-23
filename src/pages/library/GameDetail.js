import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
      <h1>{game.title}</h1>
      {currentUser ? "Edit" : ""}
      {currentUser?.is_staff ? "Delete" : ""}
    </>
  );
};

export default GameDetail;
