import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import AuthTestGuard from './components/guards/AuthTestGuard';
import PublicOnlyGuard from './components/guards/PublicOnlyGuard';
import {FindPasswordPage} from './pages/auth/FindPasswordPage';
import {LoginPage} from './pages/auth/LoginPage';
import {SignUpPage} from './pages/auth/SignUpPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import {Announcements} from './pages/my-page/ui/Announcements';
import {MyPage} from './pages/my-page/ui/MyPage';
import {Settings} from './pages/my-page/ui/Settings';
import OnboardingPage from './pages/OnboardingPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfilePage from './pages/ProfilePage';
import ResultPage from './pages/ResultPage';
import {TeamBuildingPage} from './pages/team-building/ui/TeamBuildingPage';
import TestPage from './pages/TestPage';
import TestStartPage from './pages/TestStartPage';
import {OtherProfile} from './pages/team-building/ui/OtherProfile';
import {MyTeam} from './pages/team-building/ui/MyTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/test/start" element={<TestStartPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/change-password" element={<FindPasswordPage />} />

        {/* Public Only Routes: Accessible only when not authenticated */}
        <Route element={<PublicOnlyGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Protected Routes: Accessible only when authenticated */}
        <Route element={<AuthTestGuard />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:memberId" element={<OtherProfile />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/profile/create" element={<ProfileEditPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/team-building" element={<TeamBuildingPage />} />
          <Route path="/my-team" element={<MyTeam />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
