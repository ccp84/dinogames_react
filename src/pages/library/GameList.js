import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import LatestGames from './LatestGames';
import AllGames from './AllGames';
import GameAdmin from './GameAdmin';
import Loading from '../../components/Loading';
import ErrorContainer from '../../components/Layout/ErrorContainer';

const GameList = ({ list, filter }) => {
	const [listDetails, setListDetails] = useState({
		games: []
	});

	const latest = list === 'latest';
	const all = list === 'all';
	const admin = list === 'admin';
	const search = filter ? filter : '';

	const { games } = listDetails;

	const { isLoading, error } = useQuery({
		queryKey: ['libraryData', filter],
		queryFn: () => axiosReq.get(`/games/${search}`).then((res) => res.data),
		onSuccess: (data) => setListDetails({ games: data })
	});

	if (isLoading) return <Loading />;

	if (error)
		return <ErrorContainer errorContent="Error while fetching game list" />;

	return (
		<>
			{/* return  page matching the relevant list flag */}
			{latest ? <LatestGames games={games} /> : null}
			{all ? <AllGames games={games} /> : null}
			{admin ? <GameAdmin games={games} /> : null}
		</>
	);
};

export default GameList;
