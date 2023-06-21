import React, { useState } from 'react';
import UserDetails from './UserDetails';
import ReviewList from '../reviews/ReviewList';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import Loading from '../../components/Loading';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import UserRatings from '../../components/Ratings/UserRatings';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Profile = () => {
	const [reviews, setReviews] = useState({
		allReviews: []
	});
	const { allReviews } = reviews;
	const { isLoading, error } = useQuery({
		queryKey: ['reviewData'],
		queryFn: () => axiosReq.get(`/reviews/author`).then((res) => res.data),
		onSuccess: (data) => setReviews({ allReviews: data })
	});

	if (isLoading) return <Loading />;

	if (error)
		return (
			<ErrorContainer errorContent="Error fetching page detail check that you are logged in" />
		);
	return (
		<>
			<Row>
				<Col s={12} md={6} lg={4}>
					<UserDetails />
					<UserRatings />
				</Col>
				<Col s={12} md={6} lg={8}>
					<HeaderContainer
						titleContent={<>My Reviews</>}
						bodyContent={
							<>
								<ReviewList reviews={allReviews} />
							</>
						}
					/>
				</Col>
			</Row>
		</>
	);
};

export default Profile;
