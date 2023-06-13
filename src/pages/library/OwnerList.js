import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import CreateGame from "../library/CreateGame";
import {
  Alert,
  Col,
  Dropdown,
  DropdownButton,
  Row,
  Stack,
} from "react-bootstrap";
import HeaderContainer from "../../components/Layout/HeaderContainer";

const OwnerList = () => {
  const [listDetails, setListDetails] = useState({
    games: [],
  });
  const [show, setShow] = useState(false);
  const { games } = listDetails;

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["ownerData"],
    queryFn: () => axiosReq.get("/games").then((res) => res.data),
    onSuccess: (data) => setListDetails({ games: data }),
  });

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <HeaderContainer
        titleContent={
          <>
            <Stack direction="horizontal" gap={3}>
              <>Games Admin</>
              <Button variant="light" onClick={() => setShow(!show)}>
                {show ? "Close Editor" : "Add Game"}
              </Button>
            </Stack>
            <Alert show={show}>
              <CreateGame />
            </Alert>
          </>
        }
        bodyContent={
          <>
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
                                await axiosReq.delete(`/games/edit/${game.id}`);
                                // useQuery refetch will refresh the list on success
                                refetch();
                              } catch (err) {
                                return null;
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
          </>
        }
      />
    </>
  );
};

export default OwnerList;
