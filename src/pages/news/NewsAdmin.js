import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {
  Col,
  Dropdown,
  DropdownButton,
  Nav,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const NewsAdmin = () => {
  const [listDetails, setListDetails] = useState({
    news: [],
  });
  const currentUser = useCurrentUser();

  const { news } = listDetails;

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["newsAdminlist"],
    queryFn: async () =>
      await axiosReq.get("/announcement").then((res) => res.data),
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
              <Nav.Link href="#">
                <Button variant="outline-primary">New Announcement</Button>
              </Nav.Link>
            </Stack>
          </Card.Body>
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
                              // useQuery refetch will refresh the list on success
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
