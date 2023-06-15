import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateReview = ({ id }) => {
    const [review, setReview] = useState({
        game: id,
        content: ''
    });
    const [show, setShow] = useState(false);
    const { content } = review;
    const setCurrentMessage = useSetCurrentMessage();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (review) => {
            return await axiosReq.post('reviews/', review);
        },
        isLoading: () => {
            setCurrentMessage({
                flag: true,
                message: 'Saving review...',
                variant: 'primary'
            });
        },
        isError: () => {
            setCurrentMessage({
                flag: true,
                message: 'Error saving review',
                variant: 'warning'
            });
        },
        onSuccess: () => {
            setCurrentMessage({
                flag: true,
                message: 'Review saved',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['reviewData'] });
            setReview({ game: id, content: '' });
        }
    });

    const onCreate = (e) => {
        e.preventDefault();
        mutation.mutate(review);
    };

    return (
        <>
            <Button
                className="m-2"
                variant="info"
                onClick={() => setShow(!show)}
            >
                {show ? 'Close Editor' : 'Add Review'}
            </Button>
            <Alert variant="primary" show={show}>
                <Form onSubmit={onCreate}>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Label>Write a new review</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Add new review"
                            name="content"
                            value={content}
                            onChange={(e) => {
                                setReview({
                                    game: id,
                                    content: e.target.value
                                });
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="info"
                        type="submit"
                        onClick={() => setShow(!show)}
                    >
                        Submit
                    </Button>
                </Form>
            </Alert>
        </>
    );
};

export default CreateReview;
