import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { Col, Row } from "react-bootstrap";
import ReviewList from "../reviews/ReviewList";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Loading from "../../components/Loading";
import HeaderContainer from "../../components/Layout/HeaderContainer";
import UserRatings from "../../components/Ratings/UserRatings";

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

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <Row>
      <Col s={12} md={6} lg={4}>
        <UserDetails />
        <UserRatings />
      </Col>
      <Col s={12} md={6} lg={8}>
        <HeaderContainer
          titleContent={<>My Reviews</>}
          bodyContent={
            <>
              <ReviewList reviews={allReviews} />
            </>
          }
        />
      </Col>
    </Row>
  );
};

export default Profile;
