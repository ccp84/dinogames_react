import React from "react";
import { Card } from "react-bootstrap";

const HeaderContainer = ({ titleContent, bodyContent }) => {
  return (
    <>
      <Card className="m-1" border="primary">
        <Card.Header className="text-primary">
          <Card.Title className="text-primary">{titleContent}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{bodyContent}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default HeaderContainer;
