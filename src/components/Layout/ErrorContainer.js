import React from 'react';
import { Alert, Card } from 'react-bootstrap';

const ErrorContainer = ({ errorContent }) => {
    return (
        <>
            <Card className="m-1" border="warning">
                <Alert variant="warning">
                    <Alert.Heading>
                        This is not the side quest you were looking for
                    </Alert.Heading>
                </Alert>
                <Card.Body>{errorContent}</Card.Body>
            </Card>
        </>
    );
};

export default ErrorContainer;
