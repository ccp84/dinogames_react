import Container from "react-bootstrap/Container";
import "./App.css";
import "./api/axiosDefaults";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { Profile } from "./components/Profile";

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
	return (
		<Container>
			<Header />
			<RouterProvider router={router} />
		</Container>
	);
}

export default App;
