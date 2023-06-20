import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import CreateNews from './CreateNews';
import EditNews from './EditNews';
import Loading from '../../components/Loading';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import PageContainer from '../../components/Layout/PageContainer';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Stack from 'react-bootstrap/Stack';

const NewsAdmin = () => {
	const [listDetails, setListDetails] = useState({
		news: []
	});
	const [show, setShow] = useState(false);

	const currentUser = useCurrentUser();

	const { news } = listDetails;

	const { isLoading, error } = useQuery({
		queryKey: ['newsAdminlist'],
		queryFn: async () =>
			await axiosReq.get('/announcement/admin').then((res) => res.data),
		onSuccess: (data) => setListDetails({ news: data })
	});

	if (isLoading) return <Loading />;

	if (error)
		return (
			<ErrorContainer errorContent="Error fetching news announcements" />
		);

	return (
		<>
			{currentUser?.is_staff ? (
				// Admin user logged in ? display page
				<HeaderContainer
					titleContent={
						<>
							<Stack direction="horizontal" gap={3}>
								<>News Admin</>
								<Button
									variant="info"
									onClick={() => setShow(!show)}
								>
									{show ? 'Close Editor' : 'New Announcement'}
								</Button>
							</Stack>
							<Alert variant="light" show={show}>
								<CreateNews />
							</Alert>
						</>
					}
					bodyContent={
						<>
							<ListGroup className="list-group-flush">
								{news.map((item) => {
									return (
										<ListGroupItem key={item.id}>
											<EditNews
												id={item.id}
												title={item.title}
												content={item.content}
												category={item.category}
											/>
										</ListGroupItem>
									);
								})}
							</ListGroup>
						</>
					}
				/>
			) : (
				<PageContainer
					bodyContent={
						<>You must be an administrator to access this page</>
					}
				/>
			)}
		</>
	);
};

export default NewsAdmin;
