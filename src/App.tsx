import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import AboutPage from './pages/About/AboutPage';
import NotFoundPage from './pages/404/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App () {

  return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
  );
}

export default App;
