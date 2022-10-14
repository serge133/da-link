import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import { AuthProvider } from "./useAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/app" element={<Main />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
