import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const LandingPage = () => {
	const currentUser = useCurrentUser();
	return <h1>Welcome {currentUser?.firstname}</h1>;
};

export default LandingPage;
