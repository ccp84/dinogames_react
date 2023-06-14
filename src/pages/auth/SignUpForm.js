import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import HeaderFooterContainer from "../../components/Layout/HeaderFooterContainer";
import NotificationContainer from "../../components/Layout/NotificationContainer";
import {useSetCurrentMessage} from "../../contexts/CurrentMessageContext"

const SignUpForm = () => {
	const [signupData, setSignupData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
		firstname: "",
		lastname: "",
	});
	const { username, email, password1, password2, firstname, lastname } =
		signupData;
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const setCurrentMessage = useSetCurrentMessage();
	const handleChange = (event) => {
		setSignupData({
			...signupData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setErrors({});
			await axios.post("dj-rest-auth/registration/", signupData);
			setCurrentMessage({
				"variant": "success",
				"message": `Account created for ${username}`,
				"flag": true
			})
			navigate("/signin");

		} catch (err) {
			setErrors(err.response?.data);
		}
	};

	return (
		<>
			<Container>
				<HeaderFooterContainer
					titleContent={<>Sign Up</>}
					bodyContent={
						<>
							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="username">
									<Form.Label className="d-none">Username</Form.Label>
									<Form.Control
										type="text"
										placeholder="Username"
										name="username"
										value={username}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.username?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
								<Form.Group className="mb-3" controlId="email">
									<Form.Label className="d-none">Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Email"
										name="email"
										value={email}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.email?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
								<Form.Group className="mb-3" controlId="firstname">
									<Form.Label className="d-none">First Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="First Name"
										name="firstname"
										value={firstname}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.firstname?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
								<Form.Group className="mb-3" controlId="lastname">
									<Form.Label className="d-none">Last Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Last Name"
										name="lastname"
										value={lastname}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.lastname?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
								<Form.Group className="mb-3" controlId="password1">
									<Form.Label className="d-none">Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										name="password1"
										value={password1}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.password1?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
								<Form.Group className="mb-3" controlId="password2">
									<Form.Label className="d-none">Confirm Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										name="password2"
										value={password2}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.password2?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
								<Button variant="info" type="submit">
									Sign Up
								</Button>
								{errors.non_field_errors?.map((message, idx) => (
									<NotificationContainer
										variant="warning"
										key={idx}
										message={message} />
								))}
							</Form>
						</>
					}
					footerContent={
						<>
							Already have an account? Sign in <Link to="/signin">here</Link>
						</>
					}
				/>
			</Container>
		</>
	);
};

export default SignUpForm;
