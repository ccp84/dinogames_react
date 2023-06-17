import React from 'react';
import GameList from './library/GameList';
import LatestNews from './news/LatestNews';
import PageContainer from '../components/Layout/PageContainer';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const LandingPage = () => {
	return (
		<>
			<Row>
				<Col s={12} md={6}>
					<Alert variant="secondary" className="m-2">
						<Alert.Heading>Latest News</Alert.Heading>
					</Alert>
					<>
						<LatestNews />
					</>
				</Col>
				<Col s={12} md={6}>
					<Row>
						<Col>
							<Alert variant="secondary" className="m-2">
								<Alert.Heading>Latest Games</Alert.Heading>
							</Alert>
							<>
								<GameList
									list="latest"
									filter="?ordering=-id"
								/>
							</>
						</Col>
					</Row>
					<Row>
						<Col>
							<Alert variant="secondary" className="m-2">
								<Alert.Heading>About</Alert.Heading>
							</Alert>
							<>
								<PageContainer
									bodyContent={
										<>
											Welcome to our online portal. Please
											use the library page to search the
											games available to play at Dinosaur
											Games Library.
										</>
									}
								/>
							</>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default LandingPage;
