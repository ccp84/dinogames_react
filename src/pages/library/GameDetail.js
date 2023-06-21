import React, { useState } from 'react';
import Loading from '../../components/Loading';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import GameReviews from '../reviews/GameReviews';
import NoMatch from '../NoMatch';
import { axiosReq } from '../../api/axiosDefaults';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const GameDetail = () => {
	const [gameDetails, setGameDetails] = useState({ game: '' });
	const { id } = useParams();

	const { game } = gameDetails;

	const { isLoading, error } = useQuery({
		queryKey: ['gameData'],
		queryFn: () => axiosReq.get(`/games/${id}`).then((res) => res.data),
		onSuccess: (data) => setGameDetails({ game: data })
	});

	if (isLoading) return <Loading />;

	if (error) return <NoMatch errorContent={error.message} />;

	return (
		<>
			<HeaderContainer
				titleContent={<>{game.title}</>}
				bodyContent={
					<>
						<CardGroup>
							<Card border="primary">
								<Card.Body>
									Min Players: {game.minplayers}
								</Card.Body>
							</Card>
							<Card border="primary">
								<Card.Body>
									Max Players: {game.maxplayers}
								</Card.Body>
							</Card>
							<Card border="primary">
								<Card.Body>
									Time to play: {game.playtime_name} minutes
								</Card.Body>
							</Card>
							<Card border="primary">
								<Card.Body>Tags: {game.tags}</Card.Body>
							</Card>
						</CardGroup>

						<Alert variant="secondary" className="m-2">
							<Alert.Heading>Game Overview</Alert.Heading>
							{game.overview}
						</Alert>

						<GameReviews />
					</>
				}
			/>
		</>
	);
};

export default GameDetail;
