import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegularIcon = ({ iconName, className }) => {
  return <FontAwesomeIcon icon={`fa-regular fa-${iconName}`} className={className} />;
};

export default RegularIcon;
