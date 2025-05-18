import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import AuthTestGuard from './components/guards/AuthTestGuard';
import PublicOnlyGuard from './components/guards/PublicOnlyGuard';
import {UserOnlyGuard} from './components/guards/UserOnlyGuard';
import {cn} from './lib/utils';
import {DesktopLoginPage} from './pages/auth/DesktopLoginPage';
import {FindPasswordPage} from './pages/auth/FindPasswordPage';
import {LoginPage} from './pages/auth/LoginPage';
import {SignUpPage} from './pages/auth/SignUpPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import ManagerTeamBuildingPage from './pages/manager/ManagerChatPage';
import ManagerChatPage from './pages/manager/ManagerChatPage';
import ManagerMyPage from './pages/manager/ManagerMypage';
import ManagerPage from './pages/manager/ManagerPage';
import {Announcements} from './pages/my-page/ui/Announcements';
import {MyPage} from './pages/my-page/ui/MyPage';
import {Settings} from './pages/my-page/ui/Settings';
import OnboardingPage from './pages/OnboardingPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfilePage from './pages/ProfilePage';
import ResultPage from './pages/ResultPage';
import {MyTeam} from './pages/team-building/ui/MyTeam';
import {OtherProfile} from './pages/team-building/ui/OtherProfile';
import {TeamBuildingPage} from './pages/team-building/ui/TeamBuildingPage';
import TestPage from './pages/TestPage';
import TestStartPage from './pages/TestStartPage';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isManager = location.pathname.startsWith('/manager');

  return (
    <div className="w-[100vw]">
      <div
        className={cn(
          `relative mx-auto flex max-h-[100dvh] min-h-[100dvh] w-full flex-col overflow-y-auto bg-white text-center shadow`,
          isManager ? 'w-full' : 'max-w-[500px]',
        )}
      >
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
            <Route path="/manager/login" element={<DesktopLoginPage />} />
          </Route>

          <Route element={<UserOnlyGuard />}>
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
          </Route>

          {/* 매니저 */}
          <Route path="/manager" element={<ManagerPage />} />
          <Route
            path="/manager/team-building"
            element={<ManagerTeamBuildingPage />}
          />
          <Route path="/manager/chat" element={<ManagerChatPage />} />
          <Route path="/manager/mypage" element={<ManagerMyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
