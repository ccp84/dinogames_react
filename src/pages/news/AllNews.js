import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import SolidIcon from '../../components/icons/SolidIcon';
import Loading from '../../components/Loading';
import PageContainer from '../../components/Layout/PageContainer';
import HeaderContainer from '../../components/Layout/HeaderContainer';
import ErrorContainer from '../../components/Layout/ErrorContainer';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';

const AllNews = () => {
	const [listDetails, setListDetails] = useState({
		news: []
	});

	const { news } = listDetails;

	const { isLoading, error } = useQuery({
		queryKey: ['newsData'],
		queryFn: () => axiosReq.get('/announcement/').then((res) => res.data),
		onSuccess: (data) => setListDetails({ news: data })
	});

	if (isLoading) return <Loading />;

	if (error) return <ErrorContainer errorContent={error.message} />;
	return (
		<>
			{!news.length ? (
				// returned list has no length - display message
				<PageContainer bodyContent={<>No news items found</>} />
			) : (
				// Returned list length greater than 0 - map over objects
				<>
					{news.map((item, id) => {
						return (
							<HeaderContainer
								key={id}
								titleContent={
									<>
										<Row>
											<Col sm={12} md={12}>
												{item.title}
											</Col>
										</Row>
									</>
								}
								bodyContent={
									<>
										<Row>
											<Col sm={12} md={6}>
												<Card.Body>
													<Card.Text>
														{item.content}
													</Card.Text>
												</Card.Body>
											</Col>
											<Col sm={12} md={6}>
												<ListGroup>
													<ListGroupItem>
														Updated on:
														{item.lastupdated}
													</ListGroupItem>
													<ListGroupItem>
														Written by:
														{item.author}
														<SolidIcon
															className="text-warning m-1"
															iconName={
																item.profileicon
															}
														/>
													</ListGroupItem>
													<ListGroupItem>
														Category:
														{item.category_title}
													</ListGroupItem>
												</ListGroup>
											</Col>
										</Row>
									</>
								}
							/>
						);
					})}
				</>
			)}
		</>
	);
};

export default AllNews;
