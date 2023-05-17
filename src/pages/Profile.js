import React from "react";
import UserDetails from "./user/UserDetails";
import { Col, Container, Row } from "react-bootstrap";
import OwnerList from "./library/OwnerList";

const Profile = () => {
  return (
    <Container className="m-2">
      <Row>
        <Col s={12} md={6} lg={4}>
          <UserDetails />
        </Col>
        <Col s={12} md={6} lg={4}>
          <OwnerList />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
