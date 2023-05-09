import Container from "react-bootstrap/Container";
import "./App.css";
import "./api/axiosDefaults";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { Profile } from "./components/Profile";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const currentUserContext = createContext();
export const setCurrentUserContext = createContext();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Profile />,
	},
	{
		path: "/signin",
		element: <SignInForm />,
	},
	{
		path: "/signup",
		element: <SignUpForm />,
	},
]);

function App() {
	const [currentUser, setCurrentUser] = useState(null);

	const handleMount = async () => {
		try {
			const { data } = await axios.get("dj-rest-auth/user/");
			setCurrentUser(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleMount();
	}, []);

	return (
		<currentUserContext.Provider value={currentUser}>
			<setCurrentUserContext.Provider value={setCurrentUser}>
				<Container>
					<Header />
					<RouterProvider router={router} />
				</Container>
			</setCurrentUserContext.Provider>
		</currentUserContext.Provider>
	);
}

export default App;
