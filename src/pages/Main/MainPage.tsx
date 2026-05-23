import { useState } from 'react';
import './mainpage.css';
import SearchSection from '../../components/Search/Search';
import ResultsSection from '../../components/Results/Results';
import { Link } from 'react-router-dom';
import Flyout from '../../components/Flyout/Flyout';

function MainPage () {
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="app-wrapper">
      <Link to="/about" className='nav-about'>About</Link>
      <h1>Star Trek Search</h1>
        <SearchSection onSearch={handleSearch} />
        <ResultsSection search={search} />
        <Flyout />
    </div>
  );
}

export default MainPage;
