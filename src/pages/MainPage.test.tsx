import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';


vi.mock('../api/characters', () => ({
  fetchCharactersApi: vi.fn(),
}));

import { fetchCharactersApi } from '../api/characters';
import MainPage from './MainPage';

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

test('calls fetchCharactersApi after search submit', async () => {
  const user = userEvent.setup();

  vi.mocked(fetchCharactersApi).mockResolvedValue([
    {
      id: '1',
      name: 'Spock',
      description: 'Vulcan officer',
    },
  ]);

  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  );

  const input = screen.getByRole('textbox');

  await user.type(input, 'spock');

  await user.click(screen.getByRole('button', { name: /search/i }));

  await waitFor(() => {
    expect(fetchCharactersApi).toHaveBeenCalledWith('spock', 0);
  });
});