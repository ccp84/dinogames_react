import React from "react";
import UserDetails from "./user/UserDetails";
import { Card, Col, Row } from "react-bootstrap";
import OwnerList from "./library/OwnerList";

const Profile = () => {
  return (
    <Row>
      <Col s={12} md={5} lg={4}>
        <UserDetails />
      </Col>
      <Col s={12} md={6} lg={4}>
        <OwnerList />
      </Col>
      <Col s={12} md={6} lg={4}>
        <Card className="m-1" border="primary">
          <Card.Body>
            <Card.Title className="text-primary">My Reviews</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
