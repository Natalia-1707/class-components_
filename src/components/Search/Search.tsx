import './search.css';
import React, { useEffect, useState } from 'react';
import type { Props } from '../../api/types';

function SearchSection({ onSearch }: Props) {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const savedValue = localStorage.getItem('search');

    if (savedValue) {
      setSearchValue(savedValue);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = searchValue.trim();
    const saved = localStorage.getItem('search');

    if (trimmed === saved) return;

    localStorage.setItem('search', trimmed);
    onSearch(trimmed);
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          className="input"
          value={searchValue}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}

export default SearchSection;