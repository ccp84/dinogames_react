import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <>
            "Loading..."
            <Spinner animation="grow" variant="warning" size="sm" />
            <Spinner animation="grow" variant="warning" />
        </>
    );
};

export default Loading;
