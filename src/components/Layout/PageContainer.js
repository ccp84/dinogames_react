import React from "react";
import { Card } from "react-bootstrap";

const PageContainer = ({ bodyContent }) => {
	return (
		<>
			<Card className="m-1" border="primary">
				<Card.Body className="text-dark">{bodyContent}</Card.Body>
			</Card>
		</>
	);
};

export default PageContainer;
