import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NewsAdmin from "../news/NewsAdmin";
import OwnerList from "../library/OwnerList";
import PageContainer from "../../components/Layout/PageContainer";

const Admin = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      {currentUser?.is_staff ? (
        // Admin user logged in - display the page
        <Row>
          <Col sm={12} md={6}>
            <NewsAdmin />
          </Col>
          <Col sm={12} md={6}>
            <OwnerList />
          </Col>
        </Row>
      ) : (
        // No admin credentials - display warning
        <PageContainer
          bodyContent={<>You must be an administrator to access this page</>}
        />
      )}
    </>
  );
};

export default Admin;