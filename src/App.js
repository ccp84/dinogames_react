import './api/axiosDefaults';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHatWizard,
	faPuzzlePiece,
	faDice,
	faChess,
	faBookSkull,
	faUserSlash,
	faThumbsUp as faThumbsUpSolid,
	faThumbsDown as faThumbsDownSolid
} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import Profile from './pages/user/Profile';
import LandingPage from './pages/LandingPage';
import NoMatch from './pages/NoMatch';
import GameDetail from './pages/library/GameDetail';
import Library from './pages/library/Library';
import AllNews from './pages/news/AllNews';
import Admin from './pages/user/Admin';
import { Container } from 'react-bootstrap';
import Header from './components/Header';

library.add(
	faHatWizard,
	faPuzzlePiece,
	faDice,
	faChess,
	faBookSkull,
	faUserSlash,
	faThumbsUpSolid,
	faThumbsDownSolid,
	faThumbsUp,
	faThumbsDown
);

function App() {
	return (
		<>
			<Header />
			<Container className="my-4">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/signin" element={<SignInForm />} />
					<Route path="/signup" element={<SignUpForm />} />
					<Route path="/game/library" element={<Library />} />
					<Route path="game/:id" element={<GameDetail />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/news" element={<AllNews />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
