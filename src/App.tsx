import { useState } from 'react';
import './App.css';
import SearchSection from './components/Search/Search';
import ResultsSection from './components/Results/Results';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App () {
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="app-wrapper">
      <h1>Star Trek Search</h1>
      <ErrorBoundary>
        <SearchSection onSearch={handleSearch} />
        <ResultsSection search={search} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
