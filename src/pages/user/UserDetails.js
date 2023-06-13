import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import ListGroup from "react-bootstrap/ListGroup";
import SolidIcon from "../../components/icons/SolidIcon";
import Loading from "../../components/Loading";
import HeaderFooterContainer from "../../components/Layout/HeaderFooterContainer";
import UserEdit from "../user/UserEdit";

const UserDetails = () => {
  const [profileDetails, setProfileDetails] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    // initialise to logged out user to solve null error
    profileicon: "user-slash",
  });

  const { username, email, firstname, lastname, profileicon } = profileDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["profileData", profileDetails],
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

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <HeaderFooterContainer
        titleContent={
          <>
            Account Details
            <SolidIcon className="text-warning m-1" iconName={profileicon} />
          </>
        }
        bodyContent={
          <>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Username: {username}</ListGroup.Item>
              <ListGroup.Item>Email Address: {email}</ListGroup.Item>
              <ListGroup.Item>First Name: {firstname}</ListGroup.Item>
              <ListGroup.Item>Last Name: {lastname}</ListGroup.Item>
            </ListGroup>
          </>
        }
        footerContent={
          <>
            <UserEdit
              username={username}
              email={email}
              firstname={firstname}
              lastname={lastname}
              profileicon={profileicon}
            />
          </>
        }
      />
    </>
  );
};

export default UserDetails;
