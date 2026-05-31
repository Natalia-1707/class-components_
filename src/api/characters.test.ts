import { describe, test, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './characters';

globalThis.fetch = vi.fn();

describe('charactersApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createStore = () =>
    configureStore({
      reducer: {
        [charactersApi.reducerPath]:
          charactersApi.reducer,
      },
      middleware: (
        getDefaultMiddleware,
      ) =>
        getDefaultMiddleware().concat(
          charactersApi.middleware,
        ),
    });

  test('fetches characters data', async () => {
    vi.mocked(fetch).mockResolvedValue(
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
            'Content-Type':
              'application/json',
          },
        },
      ),
    );

    const store = createStore();

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(
        'spock',
      ),
    );

    expect(result.data).toEqual([
      {
        id: '1',
        name: 'Spock',
        description:
          'Gender: male | Born: 2230 | Died: 2285 | From: Vulcan',
      },
    ]);
  });

  test('trims search name', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          characters: [],
        }),
        {
          status: 200,
        },
      ),
    );

    const store = createStore();

    await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(
        '  spock  ',
      ),
    );

    expect(fetch).toHaveBeenCalled();

    const fetchCall =
      vi.mocked(fetch).mock.calls[0];

    const request =
      fetchCall[0] as Request;

    const bodyText =
      await request.text();

    const params =
      new URLSearchParams(bodyText);

    expect(
      params.get('name'),
    ).toBe('spock');
  });

  test('returns empty array when no characters found', async () => {
      vi.mocked(
        fetch,
      ).mockResolvedValue(
        new Response(
          JSON.stringify({}),
          {
            status: 200,
          },
        ),
      );

      const store =
        createStore();

      const result =
        await store.dispatch(
          charactersApi.endpoints.getCharacters.initiate(
            'spock',
          ),
        );

      expect(
        result.data,
      ).toEqual([]);
    },
  );
});