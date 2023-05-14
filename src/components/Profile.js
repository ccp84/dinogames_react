import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Profile = () => {
	const currentUser = useCurrentUser();
	return (
		<>
			<h1>Welcome {currentUser?.firstname}</h1>
			<h2>Account Details</h2>
			<table>
				<tr>
					<td>Username</td>
					<td>{currentUser?.username}</td>
				</tr>
				<tr>
					<td>First Name</td>
					<td>{currentUser?.firstname}</td>
				</tr>
				<tr>
					<td>Last Name</td>
					<td>{currentUser?.lastname}</td>
				</tr>
			</table>
		</>
	);
};

export default Profile;
