import Container from "react-bootstrap/Container";
import "./App.css";
import "./api/axiosDefaults";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";

function App() {
	return (
		<Container>
			<Header />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/signin" element={<SignInForm />} />
				<Route path="/signup" element={<SignUpForm />} />
			</Routes>
		</Container>
	);
}

export default App;
