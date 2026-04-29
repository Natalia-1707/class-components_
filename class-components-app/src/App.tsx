import React from 'react';
import './App.css'
import SearchSection from "./components/Search/Search"
import ResultsSection from "./components/Results/Results"

class App extends React.Component {
  render () {
    return (
      <div className='app-wrapper'>
        <h1>Star Trek Search</h1>
        <SearchSection />
        <ResultsSection />
      </div>
    )
  }
}

export default App
