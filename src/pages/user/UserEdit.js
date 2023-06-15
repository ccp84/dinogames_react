import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Button, Form } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';

const UserEdit = (props) => {
    const [profileDetails, setProfileDetails] = useState({
        username: props.username,
        email: props.email,
        firstname: props.firstname,
        lastname: props.lastname,
        profileicon: props.profileicon
    });

    const { email, firstname, lastname, profileicon } = profileDetails;

    const handleChange = (event) => {
        setProfileDetails({
            ...profileDetails,
            [event.target.name]: event.target.value
        });
    };
    const [show, setShow] = useState(false);
    const queryClient = useQueryClient();
    const setCurrentMessage = useSetCurrentMessage();
    const mutation = useMutation({
        mutationFn: async (profileDetails) => {
            return await axiosReq.put('dj-rest-auth/user/', profileDetails);
        },
        isLoading: () => {
            setCurrentMessage({
                flag: true,
                message: 'Saving user details...',
                variant: 'primary'
            });
        },
        isError: () => {
            setCurrentMessage({
                flag: true,
                message: `Details not saved: ${mutation.error.message}`,
                variant: 'warning'
            });
        },
        onSuccess: () => {
            setCurrentMessage({
                flag: true,
                message: 'Details saved',
                variant: 'success'
            });
            // refetch data
            queryClient.invalidateQueries({ queryKey: ['profileData'] });
            // reload to update page
            window.location.reload();
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(profileDetails);
    };

    return (
        <>
            <Button variant="info" onClick={() => setShow(!show)}>
                {show ? 'Close Editor' : 'Edit Details'}
            </Button>
            <Alert variant="light" show={show}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First Name"
                            name="firstname"
                            value={firstname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last Name"
                            name="lastname"
                            value={lastname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="profileicon">
                        <Form.Label>Profile Icon</Form.Label>
                        <Form.Select
                            required
                            aria-label="Select Profile Icon"
                            name="profileicon"
                            value={profileicon}
                            onChange={handleChange}
                        >
                            {/* These should match choices in User model */}
                            <option value="puzzle-piece">Puzzle Piece</option>
                            <option value="dice">Dice</option>
                            <option value="chess">Chess</option>
                            <option value="hat-wizard">Wizard Hat</option>
                            <option value="book-skull">Pirate</option>
                        </Form.Select>
                    </Form.Group>

                    <Button
                        className="m-2"
                        variant="info"
                        type="submit"
                        onClick={() => setShow(!show)}
                    >
                        Edit Profile
                    </Button>
                </Form>
            </Alert>
        </>
    );
};

export default UserEdit;
