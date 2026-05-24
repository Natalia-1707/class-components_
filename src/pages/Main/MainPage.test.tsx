import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';



vi.mock('../../api/characters', () => ({
  fetchCharactersApi: vi.fn(),
}));

import { fetchCharactersApi } from '../../api/characters';
import MainPage from '../Main/MainPage';

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

const renderWithProviders = (
  ui: React.ReactNode
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

test('calls fetchCharactersApi after search submit', async () => {
  const user = userEvent.setup();

  vi.mocked(fetchCharactersApi).mockResolvedValue([
    {
      id: '1',
      name: 'Spock',
      description: 'Vulcan officer',
    },
  ]);

  renderWithProviders(<MainPage />);

  const input = screen.getByRole('textbox');

  await user.type(input, 'spock');

  await user.click(screen.getByRole('button', { name: /search/i }));

  await waitFor(() => {
    expect(fetchCharactersApi).toHaveBeenCalledWith('spock');
  });
});