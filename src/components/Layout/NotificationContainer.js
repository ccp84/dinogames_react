import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const NotificationContainer = ({ variant, message, flag }) => {
    const [show, setShow] = useState(flag);

    return (
        <Row>
            <Col xs={6}>
                <Toast bg={variant} onClose={() => setShow(false)} show={show} delay={5000} autohide>
                    <Toast.Header>
                        {message}
                    </Toast.Header>
                </Toast>
            </Col>
        </Row>
    );
}

export default NotificationContainer