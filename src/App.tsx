import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthGuard from './components/guards/AuthGuard';
import PublicOnlyGuard from './components/guards/PublicOnlyGuard';
import MainPage from './pages/MainPage';
import OnboardingPage from './pages/OnboardingPage';
import TestStartPage from './pages/TestStartPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfilePage from './pages/ProfilePage';
import {LoginPage} from './pages/auth/LoginPage';
import {Announcements} from './pages/my-page/ui/Announcements';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import {TeamBuildingPage} from './pages/team-building/ui/TeamBuildingPage';
import {MyPage} from './pages/my-page/ui/MyPage';
import {Settings} from 'lucide-react';
import {FindPasswordPage} from './pages/auth/FindPasswordPage';
import {SignUpPage} from './pages/auth/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/test/start" element={<TestStartPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/change-password" element={<FindPasswordPage />} />

        {/* Public Only Routes: Accessible only when not authenticated */}
        <Route element={<PublicOnlyGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Protected Routes: Accessible only when authenticated */}
        <Route element={<AuthGuard />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/profile/create" element={<ProfileEditPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/team-building" element={<TeamBuildingPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
