import React from 'react';
import Card from 'react-bootstrap/Card';

const ErrorContainer = ({ errorContent }) => {
	return (
		<>
			<Card className="m-1" border="warning">
				<Card.Body className="text-dark">{errorContent}</Card.Body>
			</Card>
		</>
	);
};

export default ErrorContainer;
