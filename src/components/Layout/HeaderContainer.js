import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const HeaderContainer = ({ titleContent, bodyContent }) => {
    return (
        <>
            <Card className="m-1" border="primary">
                <Alert variant="primary">
                    <Alert.Heading>{titleContent}</Alert.Heading>
                </Alert>
                <Card.Body>{bodyContent}</Card.Body>
            </Card>
        </>
    );
};

export default HeaderContainer;
