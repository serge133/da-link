import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import { AuthProvider } from "./useAuth";
import ClassPage from "./pages/Class/ClassPage";
import NavigationBar from "./Components/Navbar/Navbar";

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
          <Route path="/" element={<NavigationBar />} />
          <Route
            path="/class/:crn/:department/:search"
            element={<ClassPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
