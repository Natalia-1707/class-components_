import './results.css';
import { useEffect, useRef, useState } from 'react';
import CardList from './CardList';
import type { Item } from '../../api/types';
import { fetchCharactersApi } from '../../api/characters';

function ResultsSection ({ search }: { search: string }) {
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);

  const lastSearch = useRef('');

  const fetchCharacters = async (name: string) => {
    const trimmedName = name.trim();

    if (trimmedName && trimmedName === lastSearch.current) return;

    lastSearch.current = trimmedName;

    setLoading(true);
    setItems([]);
    setError(null);

    try {
      const items = await fetchCharactersApi(name, 0);

      if (!items) {
        setError('No data received from server');
        return;
      }

      setItems(items);
    } catch {
      setError('Something went wrong 😢\nPlease try again later.')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(search || localStorage.getItem('search') || '');
  }, [search]);

  if (shouldCrash) {
    throw new Error('Test crash');
  }

    return (
      <section className="results-section">
        <h2>Results</h2>
        <div className="results-wrapper">
          <div className="results-header">
            <div>Item Name</div>
            <div>Item Description</div>
          </div>
          { loading ? (
            <div className="loading-div">Loading...</div>
          ) : error ? (
            <div className="error-div">{error}</div>
          ) : (
            <CardList items={items} />
          )}
        </div>
        <button
          onClick={() => {
            setShouldCrash(true);
          }}
        >
          Error
        </button>
      </section>
  )
}

export default ResultsSection;

