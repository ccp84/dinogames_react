import React, { useContext } from "react";
import { currentUserContext } from "../App";

export const Profile = () => {
	const currentUser = useContext(currentUserContext);
	return <div>Welcome {currentUser?.username}</div>;
};
