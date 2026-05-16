import './search.css';
import type { Props } from '../../api/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';


function SearchSection({ onSearch }: Props) {
  const [searchValue, setSearchValue] = useLocalStorage('search');
  const [savedSearch, setSavedSearch] = useLocalStorage('savedSearch');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = searchValue.trim();

    if (!trimmed) return;
    if (trimmed === savedSearch) {
      return;
    }
    setSearchValue(trimmed);
    setSavedSearch(trimmed);

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