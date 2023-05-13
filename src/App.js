import Container from "react-bootstrap/Container";
import "./App.css";
import "./api/axiosDefaults";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { Profile } from "./components/Profile";

function App() {
	return (
		<Container>
			<Header />
			<Routes>
				<Route path="/" element={<Profile />} />
				<Route path="/signin" element={<SignInForm />} />
				<Route path="/signup" element={<SignUpForm />} />
			</Routes>
		</Container>
	);
}

export default App;
