import { useState } from 'react';
import './mainpage.css';
import SearchSection from '../../components/Search/Search';
import ResultsSection from '../../components/Results/Results';
import { Link } from 'react-router-dom';
import Flyout from '../../components/Flyout/Flyout';
import { useTheme } from '../../context/ThemeContext';

function MainPage () {
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const { theme, setTheme } = useTheme();

  return (
    <div className="app-wrapper">
      <div className='app-nav'>
          <Link to="/about" className='nav-about'>About</Link>
          <button
            className="theme-buttons"
            onClick={() =>
              setTheme(
                theme === 'dark'
                  ? 'light'
                  : 'dark'
              )
            }
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined mode-icon">
              {theme === 'dark'
                ? 'light_mode'
                : 'dark_mode'}
            </span>
          </button>
      </div>
      <h1>Star Trek Search</h1>
        <SearchSection onSearch={handleSearch} />
        <ResultsSection search={search} />
        <Flyout />
    </div>
  );
}

export default MainPage;
