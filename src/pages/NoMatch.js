import React from "react";
import HeaderContainer from "../components/Layout/HeaderContainer";

const NoMatch = () => {
  return (
    <>
      <HeaderContainer
        titleContent={<>Error</>}
        bodyContent={<>This is not the side quest you were looking for</>}
      />
    </>
  );
};

export default NoMatch;
