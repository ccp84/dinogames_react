import Container from "react-bootstrap/Container";
import "./App.css";
import "./api/axiosDefaults";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import CreateGame from "./pages/library/CreateGame";
import OwnerEdit from "./pages/library/OwnerEdit";
import NoMatch from "./pages/NoMatch";
import UserEdit from "./pages/user/UserEdit";

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
        <Route path="/game/create" element={<CreateGame />} />
        <Route path="/game/edit" element={<OwnerEdit />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Container>
  );
}

export default App;
