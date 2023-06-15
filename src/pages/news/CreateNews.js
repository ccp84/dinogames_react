import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateNews = () => {
    const [announcement, setAnnouncement] = useState({
        title: '',
        content: '',
        category: 1
    });

    const { title, content, category } = announcement;

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setCurrentMessage = useSetCurrentMessage();
    const mutation = useMutation({
        mutationFn: async (announcement) => {
            return await axiosReq.post('announcement/admin', announcement);
        },
        isLoading: () => {
            setCurrentMessage({
                flag: true,
                message: 'Saving announcement..',
                variant: 'primary'
            });
        },
        isError: () => {
            setCurrentMessage({
                flag: true,
                message: 'Error saving announcement',
                variant: 'warning'
            });
        },
        onSuccess: () => {
            setCurrentMessage({
                flag: true,
                message: 'Announcement saved',
                variant: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['newsData'] });
            queryClient.invalidateQueries({ queryKey: ['newsAdminlist'] });
            navigate('/news');
        }
    });

    const onCreate = (e) => {
        e.preventDefault();
        mutation.mutate(announcement);
    };

    return (
        <>
            <Form onSubmit={onCreate}>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Post new announcement</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => {
                            setAnnouncement({
                                ...announcement,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label className="d-none">
                        Announcement content
                    </Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        placeholder="Content"
                        name="content"
                        value={content}
                        onChange={(e) => {
                            setAnnouncement({
                                ...announcement,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label className="d-none">
                        Announcement category
                    </Form.Label>
                    <Form.Select
                        required
                        aria-label="Select announcement category"
                        name="category"
                        value={category}
                        onChange={(e) => {
                            setAnnouncement({
                                ...announcement,
                                [e.target.name]: e.target.value
                            });
                        }}
                    >
                        <option value={1}>News</option>
                        <option value={2}>Events</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="info" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default CreateNews;
