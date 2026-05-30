import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import type {
  Character,
  RequestParams,
  CharactersResponse,
} from './types';

const CACHE_TTL =
  Number(import.meta.env.VITE_CACHE_TTL) || 60;

type FormattedCharacter = {
  id: string;
  name: string;
  description: string;
};

export const charactersApi = createApi({
  reducerPath: 'charactersApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/',
  }),

  tagTypes: ['Characters'],

  keepUnusedDataFor: CACHE_TTL,

  endpoints: (builder) => ({
    getCharacters: builder.query<
      FormattedCharacter[],
      string
    >({
      query: (name = '') => {
        const bodyParams: RequestParams = {
          pageSize: '10',
        };

        if (name.trim()) {
          bodyParams.name = name.trim();
        }

        return {
          url: 'character/search',
          method: 'POST',
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(bodyParams),
        };
      },

      transformResponse: (
        response: CharactersResponse,
      ) => {
        return (
          response.characters?.map(
            (char: Character) => {
              const infos = [
                char.gender &&
                  `Gender: ${char.gender}`,
                char.yearOfBirth &&
                  `Born: ${char.yearOfBirth}`,
                char.yearOfDeath &&
                  `Died: ${char.yearOfDeath}`,
                char.placeOfBirth &&
                  `From: ${char.placeOfBirth}`,
              ].filter(Boolean);

              return {
                id: char.uid,
                name: char.name,
                description:
                  infos.length > 0
                    ? infos.join(' | ')
                    : 'No detailed information available',
              };
            },
          ) || []
        );
      },

      providesTags: ['Characters'],
    }),
  }),
});

export const {
  useGetCharactersQuery,
} = charactersApi;