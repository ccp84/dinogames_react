import React from 'react';
import Card from 'react-bootstrap/Alert';
import Alert from 'react-bootstrap/Card';

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
