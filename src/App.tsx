import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import OnboardingPage from './pages/OnboardingPage';
import TestStartPage from './pages/TestStartPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
