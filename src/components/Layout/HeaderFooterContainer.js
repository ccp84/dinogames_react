import React from "react";
import { Card } from "react-bootstrap";

const HeaderFooterContainer = ({
  titleContent,
  bodyContent,
  footerContent,
}) => {
  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Header variant="light">
          <Card.Title className="text-primary">{titleContent}</Card.Title>
        </Card.Header>
        <Card.Body className="text-dark">{bodyContent}</Card.Body>
        <Card.Footer className="text-dark">{footerContent}</Card.Footer>
      </Card>
    </>
  );
};

export default HeaderFooterContainer;
