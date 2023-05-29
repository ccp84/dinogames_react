import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const EditReview = (props) => {
  const [review, setReview] = useState({
    content: props.content,
  });
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
      <Form onSubmit={onCreate}>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Edit review</Form.Label>
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
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditReview;
