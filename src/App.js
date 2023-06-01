import Container from "react-bootstrap/Container";
import "./App.css";
import "./api/axiosDefaults";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHatWizard,
  faPuzzlePiece,
  faDice,
  faChess,
  faBookSkull,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Profile from "./pages/user/Profile";
import LandingPage from "./pages/LandingPage";
import OwnerEdit from "./pages/library/OwnerEdit";
import NoMatch from "./pages/NoMatch";
import UserEdit from "./pages/user/UserEdit";
import GameDetail from "./pages/library/GameDetail";
import Library from "./pages/library/Library";
import AllNews from "./pages/news/AllNews";
import Admin from "./pages/user/Admin";

library.add(
  faHatWizard,
  faPuzzlePiece,
  faDice,
  faChess,
  faBookSkull,
  faUserSlash
);

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<UserEdit />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/game/edit" element={<OwnerEdit />} />
        <Route path="/game/library" element={<Library />} />
        <Route path="game/:id" element={<GameDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/news" element={<AllNews />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Container>
  );
}

export default App;
