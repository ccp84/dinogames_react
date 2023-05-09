import { useState, useEffect } from "react";
import axios from "axios";

export const Profile = (details) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get("dj-rest-auth/user/")
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return (
		<>
			{data &&
				data.map((item) => {
					return <p key={item.id}>{item.title}</p>;
				})}
		</>
	);
};
