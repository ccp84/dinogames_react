import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const CreateNews = () => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
    category: 1,
  });
  const { title, content, category } = announcement;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (announcement) => {
      return await axiosReq.post("announcement/admin", announcement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsData"] });
      queryClient.invalidateQueries({ queryKey: ["newsAdminlist"] });
      setAnnouncement({ title: "", content: "", category: 1 });
    },
  });

  const onCreate = (e) => {
    e.preventDefault();
    mutation.mutate(announcement);
  };

  return (
    <>
      <div>
        {mutation.isLoading ? (
          <Alert variant="info">'Posting announcement...'</Alert>
        ) : (
          <>
            {mutation.isError ? (
              <Alert variant="warning">
                Announcement not saved: {mutation.error.message}
              </Alert>
            ) : null}

            {mutation.isSuccess ? (
              <Alert variant="success">Announcement added!</Alert>
            ) : null}
          </>
        )}
      </div>
      <Form onSubmit={onCreate}>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Post new announcement</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => {
              setAnnouncement({
                ...announcement,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="d-none">Announcement content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Content"
            name="content"
            value={content}
            onChange={(e) => {
              setAnnouncement({
                ...announcement,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label className="d-none">Announcement category</Form.Label>
          <Form.Select
            required
            aria-label="Select announcement category"
            name="cateogry"
            value={category}
            onChange={(e) => {
              setAnnouncement({
                ...announcement,
                [e.target.name]: e.target.value,
              });
            }}
          >
            <option value="1">News</option>
            <option value="2">Events</option>
          </Form.Select>
        </Form.Group>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateNews;
