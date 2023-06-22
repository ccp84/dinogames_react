import React from 'react';
import { useState } from 'react';
import HeaderFooterContainer from '../../components/Layout/HeaderFooterContainer';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
	const [signupData, setSignupData] = useState({
		username: '',
		email: '',
		password1: '',
		password2: '',
		firstname: '',
		lastname: ''
	});
	const { username, email, password1, password2, firstname, lastname } =
		signupData;
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const setCurrentMessage = useSetCurrentMessage();
	const currentUser = useCurrentUser();
	const handleChange = (event) => {
		setSignupData({
			...signupData,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setErrors({});
			await axios.post('dj-rest-auth/registration/', signupData);
			setCurrentMessage({
				variant: 'success',
				message: `Account created for ${username}`,
				flag: true
			});
			navigate('/signin');
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
							titleContent={<>Sign Up</>}
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
											controlId="email"
										>
											<Form.Label className="d-none">
												Email address
											</Form.Label>
											<Form.Control
												required
												type="email"
												placeholder="Email"
												name="email"
												value={email}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.email?.map((message, idx) => (
											<Alert key={idx} variant="warning">
												{message}
											</Alert>
										))}
										<Form.Group
											className="mb-3"
											controlId="firstname"
										>
											<Form.Label className="d-none">
												First Name
											</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder="First Name"
												name="firstname"
												value={firstname}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.firstname?.map(
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
											controlId="lastname"
										>
											<Form.Label className="d-none">
												Last Name
											</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder="Last Name"
												name="lastname"
												value={lastname}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.lastname?.map(
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
											controlId="password1"
										>
											<Form.Label className="d-none">
												Password
											</Form.Label>
											<Form.Control
												required
												type="password"
												placeholder="Password"
												name="password1"
												value={password1}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.password1?.map(
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
											controlId="password2"
										>
											<Form.Label className="d-none">
												Confirm Password
											</Form.Label>
											<Form.Control
												required
												type="password"
												placeholder="Confirm Password"
												name="password2"
												value={password2}
												onChange={handleChange}
											/>
										</Form.Group>
										{errors.password2?.map(
											(message, idx) => (
												<Alert
													key={idx}
													variant="warning"
												>
													{message}
												</Alert>
											)
										)}
										<Button variant="info" type="submit">
											Sign Up
										</Button>
										{errors.non_field_errors?.map(
											(message, idx) => (
												<Alert
													variant="warning"
													key={idx}
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
									Already have an account?
									<Link to="/signin">
										<Button variant="info" className="m-2">
											Sign in here
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

export default SignUpForm;
