import React from "react";
import Card from "react-bootstrap/Card";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Layout/PageContainer";

const LatestGames = ({ games }) => {
  return (
    <>
      {!games.length ? (
        // Games list has no length - display message
        <Row>
          <Col>
            <PageContainer
              bodyContent={<>No games found. Requests feature coming soon</>}
            />
          </Col>
        </Row>
      ) : (
        // Games list is greater than 0 - display returned games
        <>
          <PageContainer
            bodyContent={
              <>
                <ListGroup>
                  {/* Get latest 5 games only */}
                  {games.slice(0, 5).map((game, id) => {
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
              </>
            }
          />
        </>
      )}
    </>
  );
};

export default LatestGames;
