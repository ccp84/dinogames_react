import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Stack,
} from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const EditReview = (props) => {
  const [review, setReview] = useState({
    content: props.content,
  });
  const [show, setShow] = useState(false);
  const { content } = review;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (review) => {
      return await axiosReq.put(`reviews/${props.id}`, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewData"] });
    },
  });

  const onCreate = (e) => {
    e.preventDefault();
    mutation.mutate(review);
  };

  return (
    <>
      {props.content}
      <Button className="m-2" variant="info" onClick={() => setShow(!show)}>
        {show ? "Close Editor" : "Edit Review"}
      </Button>
      <div>
        {mutation.isLoading ? (
          <Alert variant="info">'Updating review...'</Alert>
        ) : (
          <>
            {mutation.isError ? (
              <Alert variant="warning">
                Review not saved: {mutation.error.message}
              </Alert>
            ) : null}

            {mutation.isSuccess ? (
              <Alert variant="success">Review updated!</Alert>
            ) : null}
          </>
        )}
      </div>
      <Alert variant="primary" show={show}>
        Edit your review of {props.game_title}
        <Form onSubmit={onCreate}>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label className="d-none">Edit review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Edit review"
              name="content"
              value={content}
              onChange={(e) => {
                setReview({
                  ...review,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <Button variant="info" type="submit" onClick={() => setShow(!show)}>
              Submit
            </Button>
            <DropdownButton
              id="dropdown-basic-button"
              title="Delete"
              variant="danger"
            >
              <Dropdown.Item
                onClick={async () => {
                  try {
                    await axiosReq.delete(`/reviews/${props.id}`);
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
          </Stack>
        </Form>
      </Alert>
    </>
  );
};

export default EditReview;
