import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const HeaderFooterContainer = ({
	titleContent,
	bodyContent,
	footerContent
}) => {
	return (
		<>
			<Card className="m-1" border="info">
				<Alert variant="primary">
					<Alert.Heading>{titleContent}</Alert.Heading>
				</Alert>

				<Card.Body>{bodyContent}</Card.Body>
				<Alert variant="primary" className="m-0">
					{footerContent}
				</Alert>
			</Card>
		</>
	);
};

export default HeaderFooterContainer;
