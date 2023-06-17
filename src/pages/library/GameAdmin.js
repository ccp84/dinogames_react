import React, { useState } from 'react';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import CreateGame from './CreateGame';
import Loading from '../../components/Loading';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const OwnerList = () => {
	const [listDetails, setListDetails] = useState({
		games: []
	});
	const [show, setShow] = useState(false);
	const { games } = listDetails;
	const setCurrentMessage = useSetCurrentMessage();
	const { isLoading, error, refetch } = useQuery({
		queryKey: ['ownerData'],
		queryFn: () => axiosReq.get('/games/').then((res) => res.data),
		onSuccess: (data) => setListDetails({ games: data })
	});

	if (isLoading) return <Loading />;

	if (error) return <ErrorContainer errorContent={error.message} />;

	return (
		<>
			<HeaderContainer
				titleContent={
					<>
						<Stack direction="horizontal" gap={3}>
							<>Games Admin</>
							<Button
								variant="light"
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
							{games.map((game, id) => {
								return (
									<ListGroup.Item key={id}>
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
																// useQuery refetch will refresh the list on success
																refetch();
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
