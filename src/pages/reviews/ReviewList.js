import React from "react";
import { Alert, Card, ListGroup, ListGroupItem, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditReview from "./EditReview";

const ReviewList = (props) => {
  return (
    <>
      {/* If list is empty */}
      {!props.reviews.length ? (
        <ListGroup>
          <ListGroupItem>
            No reviews yet. Why not write the first one.
          </ListGroupItem>
        </ListGroup>
      ) : (
        <>
          <ListGroup>
            {props.reviews.map((review) => {
              return (
                <ListGroupItem key={review.id}>
                  <Card.Body>
                    {/* If author give edit and delete options */}
                    {review.is_author ? (
                      <>
                        <Alert variant="primary">
                          <>Edit your review of {review.game_title}</>
                          <EditReview id={review.id} content={review.content} />
                        </Alert>
                      </>
                    ) : (
                      <>{review.content}</>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <Stack direction="horizontal" gap={3}>
                      <>
                        {review.author}
                        <FontAwesomeIcon
                          className="text-primary m-1"
                          icon={`fa-solid fa-${review.profileicon}`}
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
