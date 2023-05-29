import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosReq } from "../../api/axiosDefaults";
import { useQueryClient } from "@tanstack/react-query";
import EditReview from "./EditReview";

const ReviewList = (props) => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
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
                  <Card.Body>{review.content}</Card.Body>
                  <Card.Footer>
                    {/* If author give edit and delete options */}
                    {review.is_author ? (
                      <>
                        <Stack direction="horizontal" gap={3}>
                          <>Review of {review.game_title}</>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title="Delete"
                            variant="danger"
                          >
                            <Dropdown.Item
                              onClick={async () => {
                                try {
                                  await axiosReq.delete(
                                    `/reviews/${review.id}`
                                  );
                                  // Invalidate query and refetch data
                                  queryClient.invalidateQueries({
                                    queryKey: ["reviewData"],
                                  });
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            >
                              Confirm Delete
                            </Dropdown.Item>
                          </DropdownButton>
                          <Button
                            className="m-2"
                            variant="info"
                            onClick={() => setShow(!show)}
                          >
                            {show ? "Close" : "Edit"}
                          </Button>
                        </Stack>
                      </>
                    ) : (
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
                    )}
                  </Card.Footer>
                  <Alert show={show} variant="primary">
                    <EditReview id={review.id} content={review.content} />
                  </Alert>
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
