import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SolidIcon = ({ iconName, className }) => {
  return (
    <FontAwesomeIcon icon={`fa-solid fa-${iconName}`} className={className} />
  );
};

export default SolidIcon;
