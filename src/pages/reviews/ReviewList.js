import React from "react";
import {
  Alert,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosReq } from "../../api/axiosDefaults";
import { useQueryClient } from "@tanstack/react-query";

const ReviewList = (props) => {
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
                  <p>{review.content}</p>
                  <p>
                    Updated on: {review.lastupdated} by : {review.author}
                    <FontAwesomeIcon
                      className="text-primary m-1"
                      icon={`fa-solid fa-${review.profileicon}`}
                    />
                  </p>
                  {/* If author give edit and delete options */}
                  {review.is_author ? (
                    <>
                      <Stack direction="horizontal" gap={3}>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Delete"
                          variant="danger"
                        >
                          <Dropdown.Item
                            onClick={async () => {
                              try {
                                await axiosReq.delete(`/reviews/${review.id}`);
                                // Invalidate query and refetch data
                                queryClient.invalidateQueries({
                                  queryKey: ["reviewData"],
                                });
                              } catch (err) {
                                <Alert>{err.message}</Alert>;
                              }
                            }}
                          >
                            Confirm Delete
                          </Dropdown.Item>
                        </DropdownButton>
                        <Button variant="info">Edit</Button>
                      </Stack>
                    </>
                  ) : null}
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
