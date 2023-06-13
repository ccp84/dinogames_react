import React from "react";
import { Alert, Card } from "react-bootstrap";

const HeaderContainer = ({ titleContent, bodyContent }) => {
	return (
		<>
			<Card className="m-1" border="primary">

				<Alert variant="primary"><Alert.Heading>{titleContent}</Alert.Heading></Alert>

				<Card.Body>{bodyContent}</Card.Body>
			</Card>
		</>
	);
};

export default HeaderContainer;
