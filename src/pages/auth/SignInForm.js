import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { setCurrentUserContext } from "../../App";

const SignInForm = () => {
	const setCurrentUser = useContext(setCurrentUserContext);
	const [signinData, setSigninData] = useState({
		username: "",
		password: "",
	});
	const { username, password } = signinData;

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (event) => {
		setSigninData({
			...signinData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post("dj-rest-auth/login/", signinData);
			console.log(data.user);
			setCurrentUser(data.user);
			navigate("/");
		} catch (err) {
			setErrors(err.response?.data);
			console.log(errors.data);
		}
	};

	return (
		<Container>
			<h1 className="text-primary">Sign In</h1>
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
					<Alert key={idx} variant="warning">
						{message}
					</Alert>
				))}
				<Form.Group className="mb-3" controlId="password">
					<Form.Label className="d-none">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors.password?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button variant="dark" type="submit">
					Sign In
				</Button>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert key={idx} variant="warning" className="mt-3">
						{message}
					</Alert>
				))}
			</Form>
			<p>
				Don't have an account? Sign up <Link to="/signup">here</Link>
			</p>
		</Container>
	);
};

export default SignInForm;
