import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.webp";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navigate = useNavigate();

  const setCurrentUser = useSetCurrentUser();
  const SignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  const currentUser = useCurrentUser();
  const staff = currentUser?.is_staff;

  const loggedIn = (
    <>
      <Nav.Link href="/game/library">
        <Button variant="warning">Library</Button>
      </Nav.Link>
      <Nav.Link href="/news">
        <Button variant="warning">News</Button>
      </Nav.Link>
      {staff ? (
        <>
          <Nav.Link href="/admin">
            <Button variant="outline-warning">Admin</Button>
          </Nav.Link>
        </>
      ) : (
        ""
      )}
      <Nav.Link onClick={SignOut}>
        <Button variant="outline-warning">Logout</Button>
      </Nav.Link>
      <Nav.Link href="/profile">
        Signed in as: {currentUser?.username}
        <FontAwesomeIcon
          className="text-warning m-1"
          icon={`fa-solid fa-${currentUser?.profileicon}`}
        />
      </Nav.Link>
    </>
  );
  const loggedOut = (
    <>
      <Nav.Link className="text-warning" href="/game/library">
        <Button variant="warning">View Library</Button>
      </Nav.Link>
      <Nav.Link href="/news">
        <Button variant="warning">News</Button>
      </Nav.Link>
      <Nav.Link href="/signin">
        <Button variant="outline-warning">Login</Button>
      </Nav.Link>
      <Nav.Link href="/signup">
        <Button variant="outline-warning">Signup</Button>
      </Nav.Link>
      <Navbar.Text>
        <FontAwesomeIcon
          className="text-warning m-2"
          icon={`fa-solid fa-user-slash`}
        />
      </Navbar.Text>
    </>
  );
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{currentUser ? loggedIn : loggedOut}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
