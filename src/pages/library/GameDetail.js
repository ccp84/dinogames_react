import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import {
    Alert,
    Button,
    Card,
    CardGroup,
    Dropdown,
    DropdownButton,
    Stack
} from 'react-bootstrap';
import Loading from '../../components/Loading';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import GameReviews from '../reviews/GameReviews';

const GameDetail = () => {
    const [gameDetails, setGameDetails] = useState({ game: '' });
    const setCurrentMessage = useSetCurrentMessage();
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    const { game } = gameDetails;

    const { isLoading, error } = useQuery({
        queryKey: ['gameData'],
        queryFn: () => axiosReq.get(`/games/${id}`).then((res) => res.data),
        onSuccess: (data) => setGameDetails({ game: data })
    });

    if (isLoading) return <Loading />;

    if (error)
        return (
            <>
                <ErrorContainer errorContent={error.message} />
            </>
        );

    return (
        <>
            <HeaderContainer
                titleContent={
                    <>
                        {game.title}
                        {currentUser?.is_staff ? (
                            // Admin user logged in - show edit and delete options
                            <>
                                <Stack direction="horizontal" gap={3}>
                                    <Link
                                        to="/game/edit"
                                        state={{ prop: game }}
                                    >
                                        <Button className="m-1" variant="info">
                                            Edit
                                        </Button>
                                    </Link>
                                    <DropdownButton
                                        id="dropdown-basic-button"
                                        title="Delete"
                                        variant="danger"
                                    >
                                        <Dropdown.Item
                                            onClick={async () => {
                                                try {
                                                    await axiosReq.delete(
                                                        `/games/edit/${game.id}`
                                                    );
                                                    setCurrentMessage({
                                                        flag: true,
                                                        message: `${game.title} deleted`,
                                                        variant: 'success'
                                                    });
                                                    navigate('/game/library');
                                                } catch (err) {
                                                    setCurrentMessage({
                                                        flag: true,
                                                        message: `Error deleting ${game.title}`,
                                                        variant: 'warning'
                                                    });
                                                }
                                            }}
                                        >
                                            Confirm Delete
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </Stack>
                            </>
                        ) : //  No admin credentials - nothing else to display
                        null}
                    </>
                }
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

                        <Alert variant="primary" className="m-2">
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
