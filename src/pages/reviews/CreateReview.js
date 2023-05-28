import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const CreateReview = () => {
  const mutation = useMutation({
    mutationFn: (formData) => {
      return axiosReq.post("reviews/", formData);
    },
  });
  const onSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(new FormData(event.target));
  };

  return (
    <>
      <div>
        {mutation.isLoading ? (
          <Alert variant="info">'Adding review...'</Alert>
        ) : (
          <>
            {mutation.isError ? (
              <Alert variant="warning">
                Review not saved: {mutation.error.message}
              </Alert>
            ) : null}

            {mutation.isSuccess ? (
              <Alert variant="success">Review added!</Alert>
            ) : null}
          </>
        )}
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Write a new review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add new review"
            name="content"
          />
        </Form.Group>
        <Button type="submit" variant="info">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateReview;
