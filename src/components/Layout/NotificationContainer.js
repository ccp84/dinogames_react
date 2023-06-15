import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import {
    useCurrentMessage,
    useSetCurrentMessage
} from '../../contexts/CurrentMessageContext';

const NotificationContainer = () => {
    const setCurrentMessage = useSetCurrentMessage();
    const currentMessage = useCurrentMessage();
    const { variant, flag, message } = currentMessage;

    return (
        <Row>
            <Col xs={6}>
                <Toast
                    bg={variant}
                    onClose={() => {
                        setCurrentMessage({
                            message: '',
                            variant: '',
                            flag: false
                        });
                    }}
                    show={flag}
                    delay={5000}
                    autohide
                >
                    <Toast.Header>{message}</Toast.Header>
                </Toast>
            </Col>
        </Row>
    );
};

export default NotificationContainer;
