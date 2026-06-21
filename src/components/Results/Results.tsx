'use client';
import './results.css';
import CardList from './CardList';
import { useEffect, useState } from 'react';
import { useGetCharactersQuery, charactersApi } from '../../api/characters';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Pagination from './Pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'

function ResultsSection ({ search }: { search: string }) {

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [shouldCrash, setShouldCrash] = useState(false);
  /* const [searchParams, setSearchParams] = useSearchParams(); */
  const [isManualRefresh, setIsManualRefresh] = useState(false);

  const pageFromUrl = Number(searchParams.get('page') || 1);
  const page = pageFromUrl - 1;

  const ITEMS_PER_PAGE = 10;

  const [savedSearch] = useLocalStorage('search');

  const currentSearch = search || savedSearch || '';


  const {
    data: items = [],
    isLoading,
    error,
  } = useGetCharactersQuery(currentSearch);

  const paginatedItems = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const hasNextPage =  (page + 1) * ITEMS_PER_PAGE < items.length;

   useEffect(() => {
    router.replace('?page=1');
  }, [search, router]);
  

   if (shouldCrash) {
    throw new Error('Test crash');
  }

  const dispatch = useDispatch();
  const handleRefresh = () => {
    setIsManualRefresh(true);

    dispatch(charactersApi.util.invalidateTags(['Characters']));

    setTimeout(() => {
      setIsManualRefresh(false);
    }, 500);
  };

    return (
      <section className="results-section">
        <h2>Results</h2>
        <div className="results-wrapper">
          <div className="results-header">
            <div>Item Name</div>
            <div>Item Description</div>
          </div>
          {isLoading ? (
            <div className="loading-div">Loading...</div>
          ) : error ? (
            <div className="error-div">
              Something went wrong 😢
            </div>
          ) : (
            <>
            {isManualRefresh && (
              <div className="refreshing-div">
                Refreshing...
              </div>
            )}
              <CardList items={paginatedItems} />
            </>
          )}
        </div>
        {items.length > 0 && (
          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            onPrevPage={() => {
              router.push(`?page=${pageFromUrl - 1}`);
            }}
            onNextPage={() => {
              router.push(`?page=${pageFromUrl + 1}`);
            }}
          />
        )}
        <div className='results-section-buttons'>
          <button 
           onClick={() => handleRefresh()}
          >
            Refresh
          </button>
          <button
            onClick={() => {
              setShouldCrash(true);
            }}
          >
            Error
          </button>
        </div>
      </section>
  )
}

export default ResultsSection;

