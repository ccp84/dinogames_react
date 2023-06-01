import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {
  Alert,
  Col,
  Dropdown,
  DropdownButton,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CreateNews from "./CreateNews";

const NewsAdmin = () => {
  const [listDetails, setListDetails] = useState({
    news: [],
  });
  const [show, setShow] = useState(false);
  const currentUser = useCurrentUser();

  const queryClient = useQueryClient();

  const { news } = listDetails;

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["newsAdminlist"],
    queryFn: async () =>
      await axiosReq.get("/announcement/admin").then((res) => res.data),
    onSuccess: (data) => setListDetails({ news: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {currentUser?.is_staff ? (
        <Card className="m-1" border="primary">
          <Card.Body>
            <Stack direction="horizontal" gap={3}>
              <Card.Title className="text-primary">News Admin</Card.Title>
              <Button variant="outline-primary" onClick={() => setShow(!show)}>
                {show ? "Close Editor" : "Post Announcement"}
              </Button>
            </Stack>
          </Card.Body>
          <Alert show={show}>
            <CreateNews />
          </Alert>
          <ListGroup className="list-group-flush">
            {news.map((item, id) => {
              return (
                <ListGroup.Item key={id}>
                  <Row>
                    <Col>{item.title}</Col>
                    <Col>
                      <Link to={`/news/edit/${item.id}`}>
                        <Button variant="info">Edit</Button>
                      </Link>
                    </Col>
                    <Col>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Delete"
                        variant="danger"
                      >
                        <Dropdown.Item
                          onClick={async () => {
                            try {
                              await axiosReq.delete(
                                `/announcement/admin/${item.id}`
                              );
                              // Invalidate main query and refetch data
                              queryClient.invalidateQueries({
                                queryKey: ["newsData"],
                              });
                              // refetch admin list
                              refetch();
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        >
                          Confirm Delete
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      ) : (
        "You must be an administrator to access this page"
      )}
    </>
  );
};

export default NewsAdmin;
