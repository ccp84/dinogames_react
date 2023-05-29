import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import CreateReview from "../reviews/CreateReview";

const AllGames = (props) => {
  const currentUser = useCurrentUser();
  const [show, setShow] = useState(false);
  return (
    <>
      {!props.games.length ? (
        <Row>
          <Col s={12} md={6} lg={4}>
            <Card className="m-2" border="primary">
              <Card.Body>
                No games found. Requests feature coming soon
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            {props.games.map((game, id) => {
              return (
                <Col s={12} md={6} lg={4} key={id}>
                  <Card className="m-2" border="primary">
                    <Link to={`/game/${game.id}`}>
                      <Card.Header>
                        <Card.Title className="text-primary">
                          {game.title}
                          {currentUser?.is_staff ? (
                            <Link to="/game/edit" state={{ prop: game }}>
                              <Button className="m-2" variant="info">
                                Edit
                              </Button>
                            </Link>
                          ) : (
                            ""
                          )}
                        </Card.Title>
                      </Card.Header>
                    </Link>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Row>Min Players: {game.minplayers}</Row>
                          <Row>Max Players: {game.maxplayers}</Row>
                          <Row>Time to play:</Row>
                          <Row>{game.get_playtime_display} minutes</Row>
                        </Col>
                        <Col>
                          <Row>Tags: {game.tags}</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                    {currentUser ? (
                      <Card.Footer>
                        <Card.Title className="text-primary">
                          <Button
                            className="m-2"
                            variant="info"
                            onClick={() => setShow(!show)}
                          >
                            {show ? "Close" : "Add Review"}
                          </Button>
                        </Card.Title>
                      </Card.Footer>
                    ) : (
                      <Card.Footer>
                        <Link to="/signin">
                          <Button className="m-2" variant="info">
                            Sign in to review
                          </Button>
                        </Link>
                      </Card.Footer>
                    )}
                    <Alert show={show} variant="outline-info">
                      <CreateReview id={game.id} />
                    </Alert>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default AllGames;
