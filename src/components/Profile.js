import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const Profile = () => {
	const currentUser = useCurrentUser();
	return <div>Welcome {currentUser?.firstname}</div>;
};
