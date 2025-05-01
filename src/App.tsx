import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import OnboardingPage from './pages/OnboardingPage';
import TestStartPage from './pages/TestStartPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import ProfileCreatePage from './pages/ProfileCreatePage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/test/start" element={<TestStartPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/profile" element={<TestPage />} />
          <Route path="/profile/create" element={<ProfileCreatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
