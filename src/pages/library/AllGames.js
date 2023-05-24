import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const AllGames = (props) => {
  const currentUser = useCurrentUser();
  return (
    <>
      {!props.games.length ? (
        <Row>
          <Col s={12} md={6} lg={4}>
            <Card className="m-2" border="primary">
              <Card.Body>No games found. Why not add one</Card.Body>
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
                        </Card.Title>
                      </Card.Header>
                    </Link>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Row>Min Players: {game.minplayers}</Row>
                          <Row>Max Players: {game.maxplayers}</Row>
                          <Row>Time to play:</Row>
                          <Row>{game.playtime} minutes</Row>
                        </Col>
                        <Col>
                          <Row>Tags: {game.tags}</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                    {currentUser ? (
                      <Card.Footer>
                        <Card.Title className="text-primary">
                          <Button className="m-2" variant="info">
                            Add Review
                          </Button>

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
                      </Card.Footer>
                    ) : (
                      ""
                    )}
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
