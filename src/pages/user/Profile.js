import React from 'react';
import UserDetails from './UserDetails';
import UserRatings from '../../components/Ratings/UserRatings';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserReviews from '../reviews/UserReviews';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import PageContainer from '../../components/Layout/PageContainer';

const Profile = () => {
	const currentUser = useCurrentUser();

	return (
		<>
			{currentUser ? (
				<>
					<Row>
						<Col s={12} md={6} lg={4}>
							<UserDetails />
							<UserRatings />
						</Col>
						<Col s={12} md={6} lg={8}>
							<UserReviews />
						</Col>
					</Row>
				</>
			) : (
				<>
					<PageContainer
						bodyContent={'You must be logged in to view this page'}
					/>
				</>
			)}
		</>
	);
};

export default Profile;
