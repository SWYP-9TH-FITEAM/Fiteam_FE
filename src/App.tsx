import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import OnboardingPage from './pages/OnboardingPage';
import TestStartPage from './pages/TestStartPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import {LoginPage} from './pages/auth/LoginPage';
import {FindEmailPage} from './pages/auth/FindEmailPage';
import {FindPasswordPage} from './pages/auth/FindPasswordPage';
import {SignUpPage} from './pages/auth/SignUpPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/test/start" element={<TestStartPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/find-email" element={<FindEmailPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
