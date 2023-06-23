import React, { useState } from 'react';
import ReviewList from './ReviewList';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import Loading from '../../components/Loading';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import HeaderContainer from '../../components/Layout/HeaderContainer';

const UserReviews = () => {
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
			<>
				<ErrorContainer errorContent="Error fetching reviews" />
			</>
		);

	return (
		<HeaderContainer
			titleContent={<>My Reviews</>}
			bodyContent={
				<>
					<ReviewList reviews={allReviews} />
				</>
			}
		/>
	);
};

export default UserReviews;
