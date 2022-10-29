import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main/Main";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import { AuthProvider } from "./Contexts/useAuth";
import ClassPage from "./pages/Class/ClassPage";
import WelcomePage from "./pages/StudygroupDashboard/WelcomePage";
import ChatroomPage from "./pages/StudygroupDashboard/ChatroomPage";
import DiscordPage from "./pages/StudygroupDashboard/DiscordPage";
import CalendarPage from "./pages/StudygroupDashboard/CalendarPage";
import PeoplePage from "./pages/StudygroupDashboard/PeoplePage";
import SettingsPage from "./pages/StudygroupDashboard/SettingsPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";

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

          <Route path="/studygroups/:crn/:department/:studygroupID">
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="chatroom" element={<ChatroomPage />} />
            <Route path="discord" element={<DiscordPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="people" element={<PeoplePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/notifications" element={<NotificationPage />} />
          {/* Auth not required for paths below */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
