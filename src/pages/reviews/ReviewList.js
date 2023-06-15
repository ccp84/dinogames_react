import React from 'react';
import EditReview from './EditReview';
import SolidIcon from '../../components/icons/SolidIcon';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Stack from 'react-bootstrap/Stack';

const ReviewList = ({ reviews }) => {
    return (
        <>
            {/* If list is empty */}
            {!reviews.length ? (
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        No reviews yet. Why not write the first one.
                    </ListGroupItem>
                </ListGroup>
            ) : (
                <>
                    <ListGroup className="list-group-flush">
                        {reviews.map((review) => {
                            return (
                                <ListGroupItem key={review.id}>
                                    {/* If author give edit and delete options */}
                                    {review.is_author ? (
                                        <EditReview
                                            id={review.id}
                                            content={review.content}
                                            game_title={review.game_title}
                                        />
                                    ) : (
                                        <>{review.content}</>
                                    )}

                                    <Card.Footer>
                                        <Stack direction="horizontal" gap={3}>
                                            <>
                                                {review.author}
                                                <SolidIcon
                                                    className="text-warning m-1"
                                                    iconName={
                                                        review.profileicon
                                                    }
                                                />
                                            </>
                                            <>{review.lastupdated}</>
                                        </Stack>
                                    </Card.Footer>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </>
            )}
        </>
    );
};

export default ReviewList;
