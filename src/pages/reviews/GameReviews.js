import React, { useState } from 'react';
import ReviewList from '../reviews/ReviewList';
import CreateReview from '../reviews/CreateReview';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import Loading from '../../components/Loading';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import { Link, useParams } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Button from 'react-bootstrap/Button';

const GameReviews = () => {
    const [reviews, setReviews] = useState({
        allReviews: []
    });
    const { allReviews } = reviews;
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const { isLoading, error } = useQuery({
        queryKey: ['reviewData'],
        queryFn: async () =>
            await axiosReq
                .get(`/reviews/?author=&game=${id}`)
                .then((res) => res.data),
        onSuccess: (data) => setReviews({ allReviews: data })
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
                titleContent={<>Reviews</>}
                bodyContent={
                    <>
                        {currentUser ? (
                            // There is a logged in user - give option to review
                            <CreateReview id={id} />
                        ) : (
                            // No user logged in - link to sign in
                            <Link to="/signin">
                                <Button className="m-2" variant="info">
                                    Sign in to Review
                                </Button>
                            </Link>
                        )}
                        <ReviewList reviews={allReviews} />
                    </>
                }
            />
        </>
    );
};

export default GameReviews;
