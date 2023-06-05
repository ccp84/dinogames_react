import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GameRatings from "../../components/Ratings/GameRatings";

const AllGames = (props) => {
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
                    <GameRatings
                      thumbsup={game.thumbsup}
                      thumbsdown={game.thumbsdown}
                      ratingid={game.rating_id}
                      ratingvalue={game.rating_value}
                    />
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
