import React from "react";
import { Card } from "react-bootstrap";

const HeaderContainer = ({ titleContent, bodyContent }) => {
  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Header className="text-light bg-primary">
          <Card.Title>{titleContent}</Card.Title>
        </Card.Header>
        <Card.Body>{bodyContent}</Card.Body>
      </Card>
    </>
  );
};

export default HeaderContainer;
