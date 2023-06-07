import React from "react";
import { Card, ListGroup, ListGroupItem, Stack } from "react-bootstrap";
import EditReview from "./EditReview";
import SolidIcon from "../../components/icons/SolidIcon";

const ReviewList = ({ reviews }) => {
  return (
    <>
      {/* If list is empty */}
      {!reviews.length ? (
        <ListGroup>
          <ListGroupItem>
            No reviews yet. Why not write the first one.
          </ListGroupItem>
        </ListGroup>
      ) : (
        <>
          <ListGroup>
            {reviews.map((review) => {
              return (
                <ListGroupItem key={review.id}>
                  <Card.Body>
                    {/* If author give edit and delete options */}
                    {review.is_author ? (
                      <>
                        <EditReview
                          id={review.id}
                          content={review.content}
                          game_title={review.game_title}
                        />
                      </>
                    ) : (
                      <>{review.content}</>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <Stack direction="horizontal" gap={3}>
                      <>
                        {review.author}
                        <SolidIcon
                          className="text-primary m-1"
                          iconName={review.profileicon}
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
