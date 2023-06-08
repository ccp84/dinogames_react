import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GameRatings from "../../components/Ratings/GameRatings";
import HeaderFooterContainer from "../../components/Layout/HeaderFooterContainer";

const AllGames = ({ games }) => {
  return (
    <>
      {!games.length ? (
        // Games has no length - return a message on screen
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
        // Games array has length > 0 so map over the listed games
        <>
          <Row>
            {games.map((game) => {
              return (
                <Col s={12} md={6} lg={4} key={game.id}>
                  <HeaderFooterContainer
                    titleContent={
                      <>
                        <Link to={`/game/${game.id}`}>{game.title}</Link>
                      </>
                    }
                    bodyContent={
                      <>
                        <Row>
                          <Col>
                            <Row>Min Players: {game.minplayers}</Row>
                            <Row>Max Players: {game.maxplayers}</Row>
                            <Row>Time to play:{game.playtime_name}</Row>
                            <Row>{game.get_playtime_display} minutes</Row>
                          </Col>
                          <Col>
                            <Row>Tags: {game.tags}</Row>
                          </Col>
                        </Row>
                      </>
                    }
                    footerContent={
                      <>
                        <GameRatings
                          thumbsup={game.thumbsup}
                          thumbsdown={game.thumbsdown}
                          ratingid={game.rating_id}
                          ratingvalue={game.rating_value}
                          gameid={game.id}
                        />
                      </>
                    }
                  />
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
