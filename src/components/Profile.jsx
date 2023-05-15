import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const { username, email, firstname, lastname, profilepic } = profileDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: () => axiosReq.get("dj-rest-auth/user/").then((res) => res.data),
    onSuccess: (data) =>
      setProfileDetails({
        username: data.username,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        profilepic: data.profilepic,
      }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card style={{ width: "18rem" }} border="primary">
        <Card.Img variant="top" src={profilepic} />
        <Card.Body>
          <Card.Title className="text-primary">Account Details</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Username: {username}</ListGroup.Item>
          <ListGroup.Item>Email Address: {email}</ListGroup.Item>
          <ListGroup.Item>First Name: {firstname}</ListGroup.Item>
          <ListGroup.Item>Last Name: {lastname}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="info">Edit Details</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Profile;