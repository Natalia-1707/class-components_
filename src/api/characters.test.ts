import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchCharactersApi } from './characters';

globalThis.fetch = vi.fn();

describe('fetchCharactersApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches characters data', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
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
    } as Response);

    const result = await fetchCharactersApi('spock');

    expect(result).toEqual([
      {
        id: '1',
        name: 'Spock',
        description:
          'Gender: male | Born: 2230 | Died: 2285 | From: Vulcan',
      },
    ]);
  });

  test('trims search name', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        characters: [],
      }),
    } as Response);

    await fetchCharactersApi('  spock  ');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.any(URLSearchParams),
      }),
    );
  });

   test('returns empty array when no characters found', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await fetchCharactersApi('spock');

    expect(result).toEqual([]);
  });
});
