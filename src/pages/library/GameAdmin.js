import React, { useState } from 'react';
import GameEdit from '../library/GameEdit';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import CreateGame from './CreateGame';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const OwnerList = ({ games }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<HeaderContainer
				titleContent={
					<>
						<Stack direction="horizontal" gap={3}>
							<>Games Admin</>
							<Button
								variant="info"
								onClick={() => setShow(!show)}
							>
								{show ? 'Close Editor' : 'Add Game'}
							</Button>
						</Stack>
						<Alert variant="light" show={show}>
							<CreateGame />
						</Alert>
					</>
				}
				bodyContent={
					<>
						<ListGroup className="list-group-flush">
							{games.map((game) => {
								return (
									<ListGroup.Item key={game.id}>
										<GameEdit
											gameID={game.id}
											gameTitle={game.title}
											gameTags={game.tags}
											gameMin={game.minplayers}
											gameMax={game.maxplayers}
											gameTime={game.playtime}
											gameOver={game.overview}
										/>
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
