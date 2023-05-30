import React from "react";
import Card from "react-bootstrap/Card";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LatestGames = (props) => {
  return (
    <>
      {!props.games.length ? (
        <Row>
          <Col>
            <Card className="m-2" border="primary">
              <Card.Body>
                No games found. Requests feature coming soon
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <Card className="m-1" border="primary">
            <ListGroup>
              {props.games.slice(0, 5).map((game, id) => {
                return (
                  <ListGroupItem key={id}>
                    <Link to={`/game/${game.id}`}>
                      <Card.Header>
                        <Card.Title>{game.title}</Card.Title>
                      </Card.Header>
                    </Link>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Card>
        </>
      )}
    </>
  );
};

export default LatestGames;
