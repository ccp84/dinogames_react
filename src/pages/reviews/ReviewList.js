import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditReview from "./EditReview";

const ReviewList = (props) => {
  const [show, setShow] = useState(false);

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
          <Button className="m-2" variant="info" onClick={() => setShow(!show)}>
            {show ? "Close" : "Edit My Reviews"}
          </Button>
          <ListGroup>
            {props.reviews.map((review) => {
              return (
                <ListGroupItem key={review.id}>
                  <Card.Body>{review.content}</Card.Body>
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
                    {/* If author give edit and delete options */}
                    {review.is_author ? (
                      <>
                        <Alert show={show} variant="primary">
                          <>Edit your review of {review.game_title}</>
                          <EditReview id={review.id} content={review.content} />
                        </Alert>
                      </>
                    ) : null}
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
