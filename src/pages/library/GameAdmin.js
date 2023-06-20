import React, { useState } from 'react';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import CreateGame from './CreateGame';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const OwnerList = ({ games }) => {
	const [show, setShow] = useState(false);
	const setCurrentMessage = useSetCurrentMessage();
	const queryClient = useQueryClient();

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
										<Row>
											<Col>{game.title}</Col>
											<Col>
												{/* Pass 'game' as state to child component */}
												{/* https://reactrouter.com/en/main/hooks/use-location */}
												<Link
													to="/game/edit"
													state={{ prop: game }}
												>
													<Button variant="info">
														Edit
													</Button>
												</Link>
											</Col>
											<Col>
												<DropdownButton
													id="dropdown-basic-button"
													title="Delete"
													variant="danger"
												>
													<Dropdown.Item
														onClick={async () => {
															try {
																await axiosReq.delete(
																	`/games/edit/${game.id}`
																);
																setCurrentMessage(
																	{
																		flag: true,
																		message: `${game.title} deleted`,
																		variant:
																			'success'
																	}
																);
																// refetch linked data
																queryClient.invalidateQueries(
																	{
																		queryKey:
																			[
																				'libraryData'
																			]
																	}
																);
															} catch (err) {
																setCurrentMessage(
																	{
																		flag: true,
																		message: `Error deleting ${game.title}`,
																		variant:
																			'warning'
																	}
																);
															}
														}}
													>
														Confirm Delete
													</Dropdown.Item>
												</DropdownButton>
											</Col>
										</Row>
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
