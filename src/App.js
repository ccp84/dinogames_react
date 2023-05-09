import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "./components/Header";

function App() {
	return (
		<div>
			<Header />
			<h1>DinoGames Library</h1>
			<h2>Login</h2>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="dark" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default App;
