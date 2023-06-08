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
import SolidIcon from "./icons/SolidIcon";

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
        <Button variant="outline-light">Library</Button>
      </Nav.Link>
      <Nav.Link href="/news">
        <Button variant="outline-light">News</Button>
      </Nav.Link>
      {staff ? (
        <>
          <Nav.Link href="/admin">
            <Button variant="outline-light">Admin</Button>
          </Nav.Link>
        </>
      ) : (
        ""
      )}
      <Nav.Link onClick={SignOut}>
        <Button variant="outline-light">Logout</Button>
      </Nav.Link>
      <Nav.Link href="/profile">
        Signed in as: {currentUser?.username}
        <SolidIcon
          className="text-light m-1"
          iconName={currentUser?.profileicon}
        />
      </Nav.Link>
    </>
  );
  const loggedOut = (
    <>
      <Nav.Link className="text-light" href="/game/library">
        <Button variant="outline-light">View Library</Button>
      </Nav.Link>
      <Nav.Link href="/news">
        <Button variant="outline-light">News</Button>
      </Nav.Link>
      <Nav.Link href="/signin">
        <Button variant="outline-light">Login</Button>
      </Nav.Link>
      <Nav.Link href="/signup">
        <Button variant="outline-light">Signup</Button>
      </Nav.Link>
      <Navbar.Text>
        <SolidIcon className="text-light m-2" iconName="user-slash" />
      </Navbar.Text>
    </>
  );
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" height="45" width="45" />
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
