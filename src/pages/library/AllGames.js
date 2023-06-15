import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import GameRatings from '../../components/Ratings/GameRatings';
import HeaderFooterContainer from '../../components/Layout/HeaderFooterContainer';
import PageContainer from '../../components/Layout/PageContainer';

const AllGames = ({ games }) => {
    return (
        <>
            {!games.length ? (
                // Games has no length - return a message on screen
                <PageContainer bodyContent={<>No games found</>} />
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
                                                <Alert.Link
                                                    href={`/game/${game.id}`}
                                                >
                                                    {game.title}
                                                </Alert.Link>
                                            </>
                                        }
                                        bodyContent={
                                            <>
                                                <Row>
                                                    <Col>
                                                        <Row>
                                                            Min Players:{' '}
                                                            {game.minplayers}
                                                        </Row>
                                                        <Row>
                                                            Max Players:{' '}
                                                            {game.maxplayers}
                                                        </Row>
                                                        <Row>
                                                            Time to play:
                                                            {game.playtime_name}
                                                        </Row>
                                                        <Row>
                                                            {
                                                                game.get_playtime_display
                                                            }{' '}
                                                            minutes
                                                        </Row>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            Tags: {game.tags}
                                                        </Row>
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
                                                    ratingvalue={
                                                        game.rating_value
                                                    }
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
