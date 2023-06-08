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
        <Card.Header className="text-light bg-primary">
          <Card.Title>{titleContent}</Card.Title>
        </Card.Header>
        <Card.Body>{bodyContent}</Card.Body>
        <Card.Footer>{footerContent}</Card.Footer>
      </Card>
    </>
  );
};

export default HeaderFooterContainer;
