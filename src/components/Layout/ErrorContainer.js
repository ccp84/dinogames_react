import React from 'react';
import { Card } from 'react-bootstrap';

const ErrorContainer = ({ errorContent }) => {
    return (
        <>
            <Card className="m-1" border="warning">
                <Card.Body className="text-dark">
                    An error has occurred: {errorContent}
                </Card.Body>
            </Card>
        </>
    );
};

export default ErrorContainer;
