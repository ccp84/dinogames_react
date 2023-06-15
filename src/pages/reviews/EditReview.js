import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Dropdown,
    DropdownButton,
    Form,
    Stack
} from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';

const EditReview = (props) => {
    const [review, setReview] = useState({
        content: props.content
    });
    const [show, setShow] = useState(false);
    const { content } = review;
    const setCurrentMessage = useSetCurrentMessage();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (review) => {
            return await axiosReq.put(`reviews/${props.id}`, review);
        },
        isLoading: () => {
            setCurrentMessage({
                flag: true,
                message: 'Updating review...',
                variant: 'primary'
            });
        },
        isError: () => {
            setCurrentMessage({
                flag: true,
                message: `Review not saved: ${mutation.error.message}`,
                variant: 'warning'
            });
        },
        onSuccess: () => {
            setCurrentMessage({
                flag: true,
                message: 'Review updated',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['gameData'] });
            queryClient.invalidateQueries({ queryKey: ['reviewData'] });
        }
    });

    const onCreate = (e) => {
        e.preventDefault();
        mutation.mutate(review);
    };

    return (
        <>
            {props.content}
            <Button
                className="m-2"
                variant="info"
                onClick={() => setShow(!show)}
            >
                {show ? 'Close Editor' : 'Edit Review'}
            </Button>
            <Alert variant="primary" show={show}>
                Edit your review of {props.game_title}
                <Form onSubmit={onCreate}>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Label className="d-none">Edit review</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Edit review"
                            name="content"
                            value={content}
                            onChange={(e) => {
                                setReview({
                                    ...review,
                                    [e.target.name]: e.target.value
                                });
                            }}
                        />
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Button
                            variant="info"
                            type="submit"
                            onClick={() => setShow(!show)}
                        >
                            Submit
                        </Button>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Delete"
                            variant="danger"
                        >
                            <Dropdown.Item
                                onClick={async () => {
                                    try {
                                        await axiosReq.delete(
                                            `/reviews/${props.id}`
                                        );
                                        setCurrentMessage({
                                            flag: true,
                                            message: 'Review deleted',
                                            variant: 'success'
                                        });
                                        // Invalidate query and refetch data
                                        queryClient.invalidateQueries({
                                            queryKey: ['reviewData']
                                        });
                                    } catch (err) {
                                        setCurrentMessage({
                                            flag: true,
                                            message: 'Error deleting review',
                                            variant: 'warning'
                                        });
                                    }
                                }}
                            >
                                Confirm Delete
                            </Dropdown.Item>
                        </DropdownButton>
                    </Stack>
                </Form>
            </Alert>
        </>
    );
};

export default EditReview;
