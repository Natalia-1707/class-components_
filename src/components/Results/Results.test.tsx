import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import ResultsSection from './Results';
import { fetchCharactersApi } from '../../api/characters';

vi.mock('../../api/characters', () => ({
  fetchCharactersApi: vi.fn(),
}));

const mockedFetchCharactersApi = vi.mocked(fetchCharactersApi);

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

test('renders Results section headers', () => {
  render(<ResultsSection />);

  expect(screen.getByText(/Results/i)).toBeInTheDocument();
  expect(screen.getByText(/Item Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Item Description/i)).toBeInTheDocument();
});

test('shows loading state while fetching', () => {
  localStorage.setItem('search', 'spock');

  mockedFetchCharactersApi.mockImplementation(
    () =>
      new Promise(() => {
      }),
  );

  render(<ResultsSection />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders fetched results', async () => {
  localStorage.setItem('search', 'spock');

  mockedFetchCharactersApi.mockResolvedValue([
    {
      id: '1',
      name: 'Spock',
      description:
        'Gender: male | Born: 2230 | Died: 2285 | From: Vulcan',
    },
  ]);

  render(<ResultsSection />);

  await waitFor(() => {
    expect(screen.getByText(/Spock/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/Born: 2230/i)).toBeInTheDocument();
});

test('renders error message when API fails', async () => {
  localStorage.setItem('search', 'spock');

  mockedFetchCharactersApi.mockRejectedValue(new Error('API Error'));

  render(<ResultsSection />);

  await waitFor(() => {
    expect(
      screen.getByText(/Something went wrong/i),
    ).toBeInTheDocument();
  });

  expect(
    screen.getByText(/Please try again later/i),
  ).toBeInTheDocument();
});

test('shows no data error when API returns null', async () => {
  localStorage.setItem('search', 'spock');

  mockedFetchCharactersApi.mockResolvedValue(null);

  render(<ResultsSection />);

  await waitFor(() => {
    expect(
      screen.getByText(/No data received from server/i),
    ).toBeInTheDocument();
  });
});


test('loads saved search from localStorage', async () => {
  localStorage.setItem('search', 'spock');

  mockedFetchCharactersApi.mockResolvedValue([]);

  render(<ResultsSection />);

  await waitFor(() => {
    expect(mockedFetchCharactersApi).toHaveBeenCalledWith('spock', 0);
  });
});

