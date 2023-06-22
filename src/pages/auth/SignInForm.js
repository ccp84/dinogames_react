import React from 'react';
import { useState } from 'react';
import {
	useCurrentUser,
	useSetCurrentUser
} from '../../contexts/CurrentUserContext';
import HeaderFooterContainer from '../../components/Layout/HeaderFooterContainer';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInForm = () => {
	const setCurrentUser = useSetCurrentUser();
	const currentUser = useCurrentUser();
	const [signinData, setSigninData] = useState({
		username: '',
		password: ''
	});
	const { username, password } = signinData;
	const setCurrentMessage = useSetCurrentMessage();
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (event) => {
		setSigninData({
			...signinData,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post(
				'dj-rest-auth/login/',
				signinData
			);
			setCurrentUser(data.user);
			setCurrentMessage({
				flag: true,
				message: 'Login Successful',
				variant: 'success'
			});
			navigate('/profile');
		} catch (err) {
			setErrors(err.response?.data);
		}
	};

	return (
		<>
			{currentUser ? (
				// There is a logged in user - redirect to profile page
				navigate('/profile')
			) : (
				// No user logged in - display as normal
				<>
					<Container>
						<HeaderFooterContainer
							titleContent={<>Sign In</>}
							bodyContent={
								<>
									<Form onSubmit={handleSubmit}>
										<Form.Group
											className="mb-3"
											controlId="username"
										>
											<Form.Label className="d-none">
												Username
											</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder="Username"
												name="username"
												value={username}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.username?.map(
											(message, idx) => (
												<Alert
													key={idx}
													variant="warning"
												>
													{message}
												</Alert>
											)
										)}
										<Form.Group
											className="mb-3"
											controlId="password"
										>
											<Form.Label className="d-none">
												Password
											</Form.Label>
											<Form.Control
												required
												type="password"
												placeholder="Password"
												name="password"
												value={password}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.password?.map(
											(message, idx) => (
												<Alert
													variant="warning"
													key={idx}
												>
													{message}
												</Alert>
											)
										)}
										<Button variant="info" type="submit">
											Sign In
										</Button>
										{errors.non_field_errors?.map(
											(message, idx) => (
												<Alert
													key={idx}
													variant="warning"
													className="mt-3"
												>
													{message}
												</Alert>
											)
										)}
									</Form>
								</>
							}
							footerContent={
								<>
									Don't have an account?
									<Link className="text-dark" to="/signup">
										<Button variant="info" className="m-2">
											Sign up here
										</Button>
									</Link>
								</>
							}
						/>
					</Container>
				</>
			)}
		</>
	);
};

export default SignInForm;
