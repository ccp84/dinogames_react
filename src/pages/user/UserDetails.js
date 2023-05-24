import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserDetails = () => {
  const [profileDetails, setProfileDetails] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    profileicon: "",
  });

  const { username, email, firstname, lastname, profileicon } = profileDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: () => axiosReq.get("dj-rest-auth/user/").then((res) => res.data),
    onSuccess: (data) =>
      setProfileDetails({
        username: data.username,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        profileicon: data.profileicon,
      }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Body>
          <Card.Title className="text-primary">
            Account Details
            <FontAwesomeIcon
              className="text-primary m-1"
              icon={`fa-solid fa-${profileicon}`}
            />
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Username: {username}</ListGroup.Item>
          <ListGroup.Item>Email Address: {email}</ListGroup.Item>
          <ListGroup.Item>First Name: {firstname}</ListGroup.Item>
          <ListGroup.Item>Last Name: {lastname}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {/* Pass userdetails to edit form as browser window state */}
          {/* https://reactrouter.com/en/main/hooks/use-location */}
          <Link to="/profile/edit" state={{ prop: profileDetails }}>
            <Button variant="info">Edit Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserDetails;
