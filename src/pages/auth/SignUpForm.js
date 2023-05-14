import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

const SignUpForm = () => {
	const [signupData, setSignupData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
		firstname: "blank",
		lastname: "blank",
	});
	const { username, email, password1, password2 } = signupData;

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (event) => {
		setSignupData({
			...signupData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("dj-rest-auth/registration/", signupData);
			console.log(response.data.user);
			navigate("/signin");
		} catch (err) {
			setErrors(err.response?.data);
			console.log(errors);
		}
	};

	return (
		<Container>
			<h1 className="text-primary">Sign Up</h1>
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
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
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
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
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
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
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
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button variant="info" type="submit">
					Sign Up
				</Button>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert key={idx} variant="warning" className="mt-3">
						{message}
					</Alert>
				))}
			</Form>
			<p>
				Already have an account? Sign in <Link to="/signin">here</Link>
			</p>
		</Container>
	);
};

export default SignUpForm;
