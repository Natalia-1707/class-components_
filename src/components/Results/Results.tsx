import './results.css';
import { useEffect, useState } from 'react';
import CardList from './CardList';
import type { Item } from '../../api/types';
import { fetchCharactersApi } from '../../api/characters';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';

function ResultsSection ({ search }: { search: string }) {
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') || 1);
  const page = pageFromUrl - 1;

  const ITEMS_PER_PAGE = 10;

  const paginatedItems = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const fetchCharacters = async (name: string) => {
  const trimmedName = name.trim();

  setLoading(true);
  setError(null);

    try {
      const data = await fetchCharactersApi(trimmedName);

      if (!data) {
        setError('No data received from server');
        return;
      }

      setItems(data);
    } catch {
      setError('Something went wrong 😢\nPlease try again later.');
    } finally {
      setLoading(false);
    }
  };

  const [savedSearch] = useLocalStorage('search');
  const hasNextPage =  (page + 1) * ITEMS_PER_PAGE < items.length;
  
  useEffect(() => {
    const name = search || savedSearch || '';

    fetchCharacters(name);
  }, [search, savedSearch]);

  useEffect(() => {
    setSearchParams({ page: '1' }, { replace: true });
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
            <CardList items={paginatedItems} />
          )}
        </div>
        {items.length > 0 && (
          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            onPrevPage={() => {
              setSearchParams({ page: String(pageFromUrl - 1) });
            }}
            onNextPage={() => {
               setSearchParams({ page: String(pageFromUrl + 1) });
            }}
          />
        )}
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

