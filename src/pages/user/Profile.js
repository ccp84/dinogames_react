import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { Card, Col, Row } from "react-bootstrap";
import ReviewList from "../reviews/ReviewList";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";

const Profile = () => {
  const [reviews, setReviews] = useState({
    allReviews: [],
  });
  const { allReviews } = reviews;
  const { isLoading, error } = useQuery({
    queryKey: ["reviewData"],
    queryFn: () => axiosReq.get(`/reviews/author`).then((res) => res.data),
    onSuccess: (data) => setReviews({ allReviews: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Row>
      <Col s={12} md={6} lg={4}>
        <UserDetails />
      </Col>
      <Col s={12} md={6} lg={8}>
        <Card className="m-1" border="primary">
          <Card.Body>
            <Card.Title className="text-primary">My Reviews</Card.Title>
          </Card.Body>
          <ReviewList reviews={allReviews} />
        </Card>
      </Col>
      <Col s={12} md={6} lg={4}></Col>
    </Row>
  );
};

export default Profile;
