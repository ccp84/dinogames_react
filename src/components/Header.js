import React, { useState } from 'react';
import logo from '../assets/logo.webp';
import SolidIcon from './icons/SolidIcon';
import { useSetCurrentMessage } from '../contexts/CurrentMessageContext';
import NotificationContainer from './Layout/NotificationContainer';
import {
	useCurrentUser,
	useSetCurrentUser
} from '../contexts/CurrentUserContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const setCurrentUser = useSetCurrentUser();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(false);
	const expand = () => setShow(true);
	const setCurrentMessage = useSetCurrentMessage();
	const SignOut = async () => {
		try {
			await axios.post('dj-rest-auth/logout/');
			setCurrentUser(null);
			setCurrentMessage({
				flag: true,
				message: 'Logout successful',
				variant: 'success'
			});
			navigate('/signin');
		} catch (err) {
			setCurrentMessage({
				flag: true,
				message: 'Error requesting logout',
				variant: 'warning'
			});
		}
	};
	const currentUser = useCurrentUser();
	const staff = currentUser?.is_staff;

	const loggedIn = (
		// Links returned when a user is logged in
		<>
			<Link className="m-2" to="/game/library">
				<Button onClick={handleClick} variant="outline-primary">
					Library
				</Button>
			</Link>
			<Link className="m-2" to="/news">
				<Button onClick={handleClick} variant="outline-primary">
					News
				</Button>
			</Link>
			{staff ? (
				// Current user is staff
				<>
					<Link className="m-2" to="/admin">
						<Button onClick={handleClick} variant="outline-primary">
							Admin
						</Button>
					</Link>
				</>
			) : (
				''
			)}
			<Link className="m-2" onClick={SignOut}>
				<Button onClick={handleClick} variant="outline-primary">
					Logout
				</Button>
			</Link>
			<Link onClick={handleClick} className="m-2" to="/profile">
				Signed in as: {currentUser?.username}
				<SolidIcon
					className="text-warning m-1"
					iconName={currentUser?.profileicon}
				/>
			</Link>
		</>
	);
	const loggedOut = (
		// No user logged in
		<>
			<Link className="m-2" to="/game/library">
				<Button onClick={handleClick} variant="outline-primary">
					View Library
				</Button>
			</Link>
			<Link className="m-2" to="/news">
				<Button onClick={handleClick} variant="outline-primary">
					News
				</Button>
			</Link>
			<Link className="m-2" to="/signin">
				<Button onClick={handleClick} variant="outline-primary">
					Login
				</Button>
			</Link>
			<Link className="m-2" to="/signup">
				<Button onClick={handleClick} variant="outline-primary">
					Signup
				</Button>
			</Link>
			<Navbar.Text>
				<SolidIcon className="text-warning m-2" iconName="user-slash" />
			</Navbar.Text>
		</>
	);
	return (
		<>
			<Navbar
				expanded={show}
				collapseOnSelect
				expand="md"
				variant="light"
			>
				<Container>
					<Navbar.Brand href="/" onClick={handleClick}>
						<img src={logo} alt="logo" height="45" width="45" />
					</Navbar.Brand>

					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						onClick={expand}
					/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto">
							{currentUser ? loggedIn : loggedOut}
						</Nav>
					</Navbar.Collapse>
				</Container>
				<NotificationContainer />
			</Navbar>
		</>
	);
};

export default Header;
