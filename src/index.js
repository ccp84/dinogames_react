import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./components/Form";
import Header from "./components/Header";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults";
import { Profile } from "./components/Profile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/signin",
		element: <Form />,
	},
	{
		path: "/signup",
		element: <SignUpForm />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Header />
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
