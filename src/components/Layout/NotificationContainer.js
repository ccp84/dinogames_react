import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';

const NotificationContainer = ({ variant, message, flag }) => {
    const [show, setShow] = useState(flag);
    const setCurrentMessage = useSetCurrentMessage();

    return (
        <Row>
            <Col xs={6}>
                <Toast
                    bg={variant}
                    onClose={() => {
                        setShow(false);
                        setCurrentMessage({
                            message: '',
                            variant: '',
                            flag: false
                        });
                    }}
                    show={show}
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
