import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import SolidIcon from '../../components/icons/SolidIcon';
import Loading from '../../components/Loading';
import HeaderContainer from '../Layout/HeaderContainer';
import ErrorContainer from '../Layout/ErrorContainer';

const UserRatings = () => {
    const [ratings, setRatings] = useState({
        myGames: []
    });
    const currentUser = useCurrentUser();
    const { myGames } = ratings;
    const { isLoading, error } = useQuery({
        queryKey: ['ratingData'],
        queryFn: () =>
            axiosReq
                .get(`/ratings/?game=&author=${currentUser.id}&rating=true`)
                .then((res) => res.data),
        onSuccess: (data) => setRatings({ myGames: data })
    });
    if (isLoading)
        return (
            <>
                <Loading />
            </>
        );

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
                        Games I like
                        <>
                            <SolidIcon
                                className="text-primary m-1"
                                iconName="thumbs-up"
                            />
                        </>
                    </>
                }
                bodyContent={
                    <>
                        {myGames.length ? (
                            // myGames has length greater than 0
                            <>
                                {myGames.map((game) => {
                                    return (
                                        <Alert key={game.id} variant="primary">
                                            <Alert.Link
                                                href={`/game/${game.game}`}
                                            >
                                                {game.game_title}
                                            </Alert.Link>
                                        </Alert>
                                    );
                                })}
                            </>
                        ) : (
                            // myGames is empty
                            <>
                                <Alert variant="primary">
                                    No games liked yet
                                </Alert>
                            </>
                        )}
                    </>
                }
            />
        </>
    );
};

export default UserRatings;
