import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const NotificationContainer = ({ variant, message }) => {
    const [show, setShow] = useState(true);

    return (
        <Row>
            <Col xs={6}>
                <Toast bg={variant} onClose={() => setShow(false)} show={show} delay={5000} autohide>
                    <Toast.Body>
                        {message}
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default NotificationContainer