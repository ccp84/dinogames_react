import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import NewsAdmin from "../news/NewsAdmin";
import CreateGame from "../library/CreateGame";

// Change sending state to edit to use params in the edit file so that these can be put into their own components with useQuery and useMutate

const Admin = () => {
  const [listDetails, setListDetails] = useState({
    games: [],
  });
  const [show, setShow] = useState(false);
  const currentUser = useCurrentUser();

  const { games } = listDetails;

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["ownerData"],
    queryFn: () => axiosReq.get("/games").then((res) => res.data),
    onSuccess: (data) => setListDetails({ games: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {currentUser?.is_staff ? (
        <Row>
          <Col sm={12} md={6}>
            <NewsAdmin />
          </Col>
          <Col sm={12} md={6}>
            <Card className="m-1" border="primary">
              <Card.Body>
                <Stack direction="horizontal" gap={3}>
                  <Card.Title className="text-primary">Games Admin</Card.Title>
                  <Button
                    variant="outline-primary"
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Close Editor" : "Add Game"}
                  </Button>
                </Stack>
              </Card.Body>
              <Alert show={show}>
                <CreateGame />
              </Alert>
              <ListGroup className="list-group-flush">
                {games.map((game, id) => {
                  return (
                    <ListGroup.Item key={id}>
                      <Row>
                        <Col>{game.title}</Col>
                        <Col>
                          {/* Pass 'game' as state to child component */}
                          {/* https://reactrouter.com/en/main/hooks/use-location */}
                          <Link to="/game/edit" state={{ prop: game }}>
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
                                    `/games/edit/${game.id}`
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
          </Col>
        </Row>
      ) : (
        "You must be an administrator to access this page"
      )}
    </>
  );
};

export default Admin;
