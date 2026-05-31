import { render, screen } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import ResultsSection from './Results';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '../../api/characters';
import selectedReducer from '../../store/selectedSlice';

globalThis.fetch = vi.fn();

const createTestStore = () =>
  configureStore({
    reducer: {
      [charactersApi.reducerPath]:
        charactersApi.reducer,
      selected: selectedReducer,
    },
    middleware: (
      getDefaultMiddleware,
    ) =>
      getDefaultMiddleware().concat(
        charactersApi.middleware,
      ),
  });


const renderWithRouter = ( ui: React.ReactNode) => {
  const testStore = createTestStore();

  return render(
    <Provider store={testStore}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

test('renders Results section headers', () => {
  renderWithRouter(<ResultsSection search="" />);

  expect(screen.getByText(/Results/i)).toBeInTheDocument();
  expect(screen.getByText(/Item Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Item Description/i)).toBeInTheDocument();
});

test('shows loading state while fetching', () => {
    vi.mocked(
      globalThis.fetch,
    ).mockImplementation(
      () =>
        new Promise(() => {}),
    );

    renderWithRouter(
      <ResultsSection search="spock" />,
    );

    expect(
      screen.getByText(
        /Loading/i,
      ),
    ).toBeInTheDocument();
  },
);

test('renders fetched results', async () => {
  vi.mocked(globalThis.fetch).mockResolvedValue(
    new Response(
      JSON.stringify({
        characters: [
          {
            uid: '1',
            name: 'Spock',
            gender: 'male',
            yearOfBirth: 2230,
            yearOfDeath: 2285,
            placeOfBirth: 'Vulcan',
          },
        ],
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ),
  );

    renderWithRouter(
      <ResultsSection search="spock" />,
    );

    expect(
      await screen.findByText(
        /Spock/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Born: 2230/i,
      ),
    ).toBeInTheDocument();
  },
);

test( 'renders error message when API fails', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue(
      new Response(
        JSON.stringify({}),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    renderWithRouter(
      <ResultsSection search="spock" />,
    );

    expect(
      await screen.findByText(
        /Something went wrong/i,
      ),
    ).toBeInTheDocument();
  },
);


test('shows error boundary when error button is clicked', async () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  renderWithRouter(
    <ErrorBoundary>
      <ResultsSection search="spock" />
    </ErrorBoundary>
  );

  const btn = screen.getByText('Error');

  btn.click();

  expect(
    await screen.findByText(/something went wrong/i)
  ).toBeInTheDocument();

  spy.mockRestore();
});