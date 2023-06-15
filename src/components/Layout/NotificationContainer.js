import React from 'react';
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
            <Toast.Header>Message</Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default NotificationContainer;
