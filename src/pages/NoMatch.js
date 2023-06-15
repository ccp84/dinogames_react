import React from 'react';
import HeaderContainer from '../components/Layout/HeaderContainer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NoMatch = ({ errorContent }) => {
    const navigate = useNavigate();
    return (
        <>
            <HeaderContainer
                titleContent={<>Error {errorContent}</>}
                bodyContent={
                    <>
                        <>This is not the side quest you were looking for</>
                        <Link to={navigate(-1)}>
                            <Button variant="info" className="m-2">
                                Go Back
                            </Button>
                        </Link>
                    </>
                }
            />
        </>
    );
};

export default NoMatch;
