import React from 'react';
import './App.css';
import SearchSection from './components/Search/Search';
import ResultsSection from './components/Results/Results';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends React.Component {
  resultsRef = React.createRef<ResultsSection>();

  handleSearch = (value: string) => {
    this.resultsRef.current?.fetchCharacters(value);
  };

  render() {
    return (
      <div className="app-wrapper">
        <h1>Star Trek Search</h1>
        <ErrorBoundary>
          <SearchSection onSearch={this.handleSearch} />
          <ResultsSection ref={this.resultsRef} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
