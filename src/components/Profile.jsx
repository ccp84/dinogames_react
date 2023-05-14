import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
// import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const { email, firstname, lastname } = profileDetails;

  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("dj-rest-auth/user/");
        setProfileDetails({
          username: data.username,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          profilepic: data.profilepic,
        });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []);

  //   const { isLoading, error } = useQuery({
  //     queryKey: ["profileData"],
  //     queryFn: () => axiosReq.get("dj-rest-auth/user/").then((res) => res.data),
  //     onSuccess: (data) =>
  //       setProfileDetails({
  //         username: data.username,
  //         email: data.email,
  //         firstname: data.firstname,
  //         lastname: data.lastname,
  //         profilepic: data.profilepic,
  //       }),
  //   });

  //   if (isLoading) return "Loading...";

  //   if (error) return "An error has occurred: " + error.message;

  const handleChange = (event) => {
    setProfileDetails({
      ...profileDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.put("dj-rest-auth/user/", profileDetails);
      navigate("/profile");
    } catch (err) {
      //   setErrors(err.response?.data);
      console.log(err.data);
    }
  };

  return (
    <>
      <h1>Welcome {firstname} </h1>
      <h2>Account Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" value={email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={firstname} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={lastname} onChange={handleChange} />
        </Form.Group>

        <Button variant="info" type="submit">
          Update Details
        </Button>
      </Form>
    </>
  );
};

export default Profile;
