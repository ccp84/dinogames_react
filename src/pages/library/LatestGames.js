import React from 'react';
import PageContainer from '../../components/Layout/PageContainer';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const LatestGames = ({ games }) => {
    return (
        <>
            {!games.length ? (
                // Games list has no length - display message
                <Row>
                    <Col>
                        <PageContainer
                            bodyContent={
                                <>
                                    No games found. Requests feature coming soon
                                </>
                            }
                        />
                    </Col>
                </Row>
            ) : (
                // Games list is greater than 0 - display returned games
                <>
                    <PageContainer
                        bodyContent={
                            <>
                                {/* Get latest 5 games only */}
                                {games.slice(0, 5).map((game) => {
                                    return (
                                        <Alert key={game.id} variant="secondary">
                                            <Alert.Link
                                                href={`/game/${game.id}`}
                                            >
                                                {game.title}
                                            </Alert.Link>
                                        </Alert>
                                    );
                                })}
                            </>
                        }
                    />
                </>
            )}
        </>
    );
};

export default LatestGames;
