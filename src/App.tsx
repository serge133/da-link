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
import ClassPage from "./pages/Class/ClassPage";
import StudygroupDashboard from "./pages/StudygroupDashboard/StudygroupDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="app">
            <Route path="" element={<Main />} />
            <Route path=":department" element={<Main />} />
            <Route path=":department/:search" element={<Main />} />
          </Route>
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="class">
            <Route path="/class/:crn/:department" element={<ClassPage />} />
            <Route
              path="/class/:crn/:department/:search"
              element={<ClassPage />}
            />
          </Route>

          <Route
            path="/studygroups/:crn/:department/:studygroupID"
            element={<StudygroupDashboard />}
          />
          {/* Auth not required for paths below */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
