import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const EditNews = (props) => {
	const [announcement, setAnnouncement] = useState({
		title: props.title,
		content: props.content,
		category: props.category
	});
	const [show, setShow] = useState(false);
	const { title, content, category } = announcement;
	const setCurrentMessage = useSetCurrentMessage();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (announcement) => {
			return await axiosReq.put(
				`announcement/admin/${props.id}`,
				announcement
			);
		},
		isLoading: () => {
			setCurrentMessage({
				flag: true,
				message: 'Updating announcement..',
				variant: 'primary'
			});
		},
		isError: () => {
			setCurrentMessage({
				flag: true,
				message: 'Error updating announcement',
				variant: 'warning'
			});
		},
		onSuccess: () => {
			setShow(!show);
			setCurrentMessage({
				flag: true,
				message: 'Announcement updated',
				variant: 'success'
			});
			// refetch linked data
			queryClient.invalidateQueries({ queryKey: ['newsData'] });
			queryClient.invalidateQueries({ queryKey: ['newsAdminlist'] });
			queryClient.invalidateQueries({ queryKey: ['newsDetail'] });
		}
	});

	const onCreate = (e) => {
		e.preventDefault();
		mutation.mutate(announcement);
	};

	return (
		<>
			<Row>
				<Col>
					<> {title}</>
				</Col>
				<Col>
					<Button variant="info" onClick={() => setShow(!show)}>
						Edit
					</Button>
				</Col>
				<Col>
					<DropdownButton
						id={title}
						key={props.id}
						title="Delete"
						variant="danger"
					>
						<Dropdown.Item
							onClick={async () => {
								try {
									await axiosReq.delete(
										`/announcement/admin/${props.id}`
									);
									setCurrentMessage({
										flag: true,
										message: 'Announcement deleted',
										variant: 'success'
									});
									// Invalidate main query and refetch data
									queryClient.invalidateQueries({
										queryKey: ['newsData']
									});
									queryClient.invalidateQueries({
										queryKey: ['newsAdminlist']
									});
								} catch (err) {
									setCurrentMessage({
										flag: true,
										message: 'Error deleting announcement',
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
				<Form onSubmit={onCreate}>
					<Form.Group className="mb-3" controlId="content">
						<Form.Label>Edit announcement</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Title"
							name="title"
							value={title}
							onChange={(e) => {
								setAnnouncement({
									...announcement,
									[e.target.name]: e.target.value
								});
							}}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label className="d-none">
							Announcement content
						</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Content"
							name="content"
							value={content}
							onChange={(e) => {
								setAnnouncement({
									...announcement,
									[e.target.name]: e.target.value
								});
							}}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="category">
						<Form.Label className="d-none">
							Announcement category
						</Form.Label>
						<Form.Select
							required
							aria-label="Select announcement category"
							name="category"
							value={category}
							onChange={(e) => {
								setAnnouncement({
									...announcement,
									[e.target.name]: e.target.value
								});
							}}
						>
							<option value={1}>News</option>
							<option value={2}>Events</option>
						</Form.Select>
					</Form.Group>
					<Stack direction="horizontal" gap={3}>
						<Button variant="info" type="submit">
							Update
						</Button>
					</Stack>
				</Form>
			</Alert>
		</>
	);
};

export default EditNews;
