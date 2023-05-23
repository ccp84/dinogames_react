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
      <Nav.Link className="text-warning" onClick={SignOut}>
        Logout
      </Nav.Link>
      <Nav.Link className="text-warning" href="/game/create">
        Add Game
      </Nav.Link>
      <Nav.Link className="text-warning" href="/game/library">
        View Library
      </Nav.Link>
      {staff ? (
        <Nav.Link className="text-warning" href="#">
          Admin
        </Nav.Link>
      ) : (
        ""
      )}
      <Nav.Link href="/profile">
        Signed in as: {currentUser?.username}
        <img src={currentUser?.profilepic} alt="profile" height="45" />
      </Nav.Link>
    </>
  );
  const loggedOut = (
    <>
      <Nav.Link className="text-warning" href="/game/library">
        View Library
      </Nav.Link>
      <Nav.Link className="text-warning" href="/signin">
        Login
      </Nav.Link>
      <Nav.Link className="text-warning" href="/signup">
        Signup
      </Nav.Link>
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
