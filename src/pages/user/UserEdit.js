import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert, Button, Form } from "react-bootstrap";

const UserEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [profileDetails, setProfileDetails] = useState({
    username: location.state.prop.username,
    email: location.state.prop.email,
    firstname: location.state.prop.firstname,
    lastname: location.state.prop.lastname,
  });

  const { username, email, firstname, lastname } = profileDetails;

  const handleChange = (event) => {
    setProfileDetails({
      ...profileDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check refresh before sending
      const { data } = await axiosReq.put("dj-rest-auth/user/", profileDetails);
      console.log(data.user);
      navigate(`/profile`);
    } catch (err) {
      console.log(errors.data);
      //   Only log errors if response is not authentication error
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <h1>Edit Details for {username}</h1>
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
        {errors.email?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
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
        {errors.firstname?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
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
        {errors.lastname?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}

        <Button className="m-2" variant="info" type="submit">
          Edit Profile
        </Button>
        <Button className="m-2" variant="info" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {message}
          </Alert>
        ))}
      </Form>
    </>
  );
};

export default UserEdit;