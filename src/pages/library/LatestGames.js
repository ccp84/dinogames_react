import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
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
          {props.games.slice(0, 5).map((game, id) => {
            return (
              <Card className="m-1" border="primary" key={id}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="text-primary">
                        {game.title}
                      </Card.Title>
                    </Col>
                    <Col>
                      <Link to={`/game/${game.id}`}>
                        <Button variant="info">More Details</Button>
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
};

export default LatestGames;
