import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import LatestGames from "./LatestGames";
import AllGames from "./AllGames";

const GameList = (props) => {
  const [listDetails, setListDetails] = useState({
    games: [],
  });

  const latest = props.list === "latest";

  const { games } = listDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["libraryData"],
    queryFn: () => axiosReq.get("/games/").then((res) => res.data),
    onSuccess: (data) => setListDetails({ games: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>{latest ? <LatestGames games={games} /> : <AllGames games={games} />}</>
  );
};

export default GameList;
