import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App () {

  return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </ErrorBoundary>
  );
}

export default App;
