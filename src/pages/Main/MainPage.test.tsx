import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach, } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeContext';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../../store/selectedSlice';
import { charactersApi } from '../../api/characters';
import MainPage from '../Main/MainPage';

globalThis.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

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

const renderWithProviders = (
  ui: React.ReactNode,
) => {
  const testStore =
    createTestStore();

  return render(
    <Provider store={testStore}>
      <ThemeProvider>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

test(
  'calls API after search submit',
  async () => {
    const user =
      userEvent.setup();

    vi.mocked(globalThis.fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          characters: [
            {
              uid: '1',
              name: 'Spock',
              gender: 'male',
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

    renderWithProviders(
      <MainPage />,
    );

    const input =
      screen.getByRole(
        'textbox',
      );

    await user.type(
      input,
      'spock',
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: /search/i,
        },
      ),
    );

    await waitFor(() => {
      expect(
        globalThis.fetch,
      ).toHaveBeenCalled();
    });

    const request =
      vi.mocked(globalThis.fetch)
        .mock.calls[1][0] as Request;

    expect(request.url)
      .toContain(
        'character/search',
      );

    expect(request.method)
      .toBe('POST');
  },
);