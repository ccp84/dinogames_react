import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import NewsAdmin from '../news/NewsAdmin';
import PageContainer from '../../components/Layout/PageContainer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GameList from '../library/GameList';

const Admin = () => {
	const currentUser = useCurrentUser();

	return (
		<>
			{currentUser?.is_staff ? (
				// Admin user logged in - display the page
				<Row>
					<Col sm={12} md={6}>
						<NewsAdmin />
					</Col>
					<Col sm={12} md={6}>
						<GameList list="admin" />
					</Col>
				</Row>
			) : (
				// No admin credentials - display warning
				<PageContainer
					bodyContent={
						<>You must be an administrator to access this page</>
					}
				/>
			)}
		</>
	);
};

export default Admin;
