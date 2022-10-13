import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouteProps,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import useAuth, { AuthProvider } from "./useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/app" element={<Main />} />
          <Route path="/" element={<h1>Test</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
