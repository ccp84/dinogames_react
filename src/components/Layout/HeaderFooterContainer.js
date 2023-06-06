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
        <Card.Header className="text-primary">
          <Card.Title className="text-primary">{titleContent}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{bodyContent}</Card.Text>
        </Card.Body>
        <Card.Footer>{footerContent}</Card.Footer>
      </Card>
    </>
  );
};

export default HeaderFooterContainer;
