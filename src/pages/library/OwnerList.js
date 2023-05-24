import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const OwnerList = () => {
  const [listDetails, setListDetails] = useState({
    games: [],
  });
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
        <Card className="m-1" border="primary">
          <Card.Body>
            <Card.Title className="text-primary">Games Admin</Card.Title>
          </Card.Body>
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
                      <Button
                        variant="danger"
                        onClick={async () => {
                          try {
                            await axiosReq.delete(`/games/edit/${game.id}`);
                            // useQuery refetch will refresh the list on success
                            refetch();
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Delete
                      </Button>
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

export default OwnerList;
