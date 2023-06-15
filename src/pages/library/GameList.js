import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import LatestGames from './LatestGames';
import AllGames from './AllGames';
import Loading from '../../components/Loading';
import ErrorContainer from '../../components/Layout/ErrorContainer'

const GameList = ({ list, filter }) => {
    const [listDetails, setListDetails] = useState({
        games: []
    });

    const latest = list === 'latest';
    const search = filter ? filter : '';

    const { games } = listDetails;

    const { isLoading, error } = useQuery({
        queryKey: ['libraryData', filter],
        queryFn: () => axiosReq.get(`/games/${search}`).then((res) => res.data),
        onSuccess: (data) => setListDetails({ games: data })
    });

    if (isLoading) return <Loading />;

    if (error) return <ErrorContainer errorContent={error.message} />;

    return (
        <>
            {latest ? (
                <LatestGames games={games} />
            ) : (
                <AllGames games={games} />
            )}
        </>
    );
};

export default GameList;
