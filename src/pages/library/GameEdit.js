import React, { useState } from 'react';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useQueryClient } from '@tanstack/react-query';

const OwnerEdit = ({
	gameID,
	gameTitle,
	gameTags,
	gameMin,
	gameMax,
	gameTime,
	gameOver
}) => {
	const [show, setShow] = useState(false);
	const [gameData, setGameData] = useState({
		id: gameID,
		title: gameTitle,
		tags: gameTags,
		minplayers: gameMin,
		maxplayers: gameMax,
		playtime: gameTime,
		overview: gameOver
	});

	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const setCurrentMessage = useSetCurrentMessage();
	const { id, title, tags, minplayers, maxplayers, playtime, overview } =
		gameData;
	const queryClient = useQueryClient();
	const handleChange = (event) => {
		setGameData({
			...gameData,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			// Check refresh before sending
			const { data } = await axiosReq.put(
				`games/edit/${gameData.id}`,
				gameData
			);
			setCurrentMessage({
				message: `${title} has been updated`,
				flag: true,
				variant: 'success'
			});
			navigate(`/game/${data.id}`);
		} catch (err) {
			//   Only log errors if response is not authentication error
			if (err.response?.status !== 401) {
				setErrors(err.response?.data);
				setCurrentMessage({
					message: `Error while updating ${title}`,
					flag: true,
					variant: 'warning'
				});
			}
		}
	};

	return (
		<>
			<Row>
				<Col>{title}</Col>
				<Col>
					<Button variant="info" onClick={() => setShow(!show)}>
						Edit
					</Button>
				</Col>
				<Col>
					<DropdownButton
						id="dropdown-button"
						key={id}
						title="Delete"
						variant="danger"
					>
						<Dropdown.Item
							onClick={async () => {
								try {
									await axiosReq.delete(`/games/edit/${id}`);
									setCurrentMessage({
										flag: true,
										message: `${title} deleted`,
										variant: 'success'
									});
									// refetch linked data
									queryClient.invalidateQueries({
										queryKey: ['libraryData']
									});
								} catch (err) {
									setCurrentMessage({
										flag: true,
										message: `Error deleting ${title}`,
										variant: 'warning'
									});
								}
							}}
						>
							Confirm Delete
						</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>
			<Alert variant="primary" show={show}>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>Game Title</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Game Title"
							name="title"
							value={title}
							onChange={handleChange}
						/>
					</Form.Group>
					{errors.title?.map((message, idx) => (
						<Alert key={idx} variant="warning">
							{message}
						</Alert>
					))}
					<Form.Group className="mb-3" controlId="tags">
						<Form.Label>Game Categories</Form.Label>
						<Form.Control
							as="textarea"
							rows={1}
							placeholder="Categories"
							name="tags"
							value={tags}
							onChange={handleChange}
						/>
						<Form.Text className="text-muted">
							Example: card, party, strategy
						</Form.Text>
					</Form.Group>
					{errors.tags?.map((message, idx) => (
						<Alert key={idx} variant="warning">
							{message}
						</Alert>
					))}
					<Form.Group className="mb-3" controlId="minplayers">
						<Form.Label>Minimum Players</Form.Label>
						<Form.Control
							required
							type="number"
							name="minplayers"
							value={minplayers}
							onChange={handleChange}
						/>
					</Form.Group>
					{errors.minplayers?.map((message, idx) => (
						<Alert key={idx} variant="warning">
							{message}
						</Alert>
					))}
					<Form.Group className="mb-3" controlId="maxplayers">
						<Form.Label>Maximum Players</Form.Label>
						<Form.Control
							required
							type="number"
							name="maxplayers"
							value={maxplayers}
							onChange={handleChange}
						/>
					</Form.Group>
					{errors.maxplayers?.map((message, idx) => (
						<Alert key={idx} variant="warning">
							{message}
						</Alert>
					))}
					<Form.Group className="mb-3" controlId="playtime">
						<Form.Label>Time to play</Form.Label>
						<Form.Select
							required
							aria-label="Select Game Play Time"
							name="playtime"
							value={playtime}
							onChange={handleChange}
						>
							{/* These should match choices in Game model */}
							<option value="0">0-5 minutes</option>
							<option value="5">5-10 minutes</option>
							<option value="10">10-20 minutes</option>
							<option value="20">20-40 minutes</option>
							<option value="40">40-90 minutes</option>
							<option value="90">90 + minutes</option>
						</Form.Select>
					</Form.Group>
					{errors.playtime?.map((message, idx) => (
						<Alert key={idx} variant="warning">
							{message}
						</Alert>
					))}
					<Form.Group className="mb-3" controlId="overview">
						<Form.Label>Overview</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Overview"
							name="overview"
							value={overview}
							onChange={handleChange}
						/>
					</Form.Group>
					{errors.overview?.map((message, idx) => (
						<Alert key={idx} variant="warning">
							{message}
						</Alert>
					))}
					<Button variant="info" type="submit">
						Update
					</Button>

					{errors.non_field_errors?.map((message, idx) => (
						<Alert key={idx} variant="warning" className="mt-3">
							{message}
						</Alert>
					))}
				</Form>
			</Alert>
		</>
	);
};

export default OwnerEdit;
