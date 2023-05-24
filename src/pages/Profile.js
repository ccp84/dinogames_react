import React from "react";
import UserDetails from "./user/UserDetails";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

const Profile = () => {
  return (
    <Row>
      <Col s={12} md={6} lg={4}>
        <UserDetails />
      </Col>
      <Col s={12} md={6} lg={4}>
        <Card className="m-1" border="primary">
          <Card.Body>
            <Card.Title className="text-primary">My Reviews</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Feature coming soon</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col s={12} md={6} lg={4}></Col>
    </Row>
  );
};

export default Profile;
