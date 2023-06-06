import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <>
      "Loading..."
      <Spinner animation="grow" variant="primary" size="sm" />
      <Spinner animation="grow" variant="primary" />
    </>
  );
};

export default Loading;
