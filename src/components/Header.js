import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Navbar</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link className="text-warning" href="#home">
						Home
					</Nav.Link>
					<Nav.Link className="text-warning" href="#features">
						Signup
					</Nav.Link>
					<Nav.Link className="text-warning" href="#features">
						Login
					</Nav.Link>
					<Nav.Link className="text-warning" href="#pricing">
						Logout
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
