import type { RequestParams, Character, CharactersResponse } from "./types";

export const fetchCharactersApi = async (name: string = "", page: number = 0) => {
  try {
    const bodyParams: RequestParams = {
      pageNumber: String(page),
      pageSize: "20",
    };

    if (name.trim()) {
      bodyParams.name = name.trim();
    }

    const response = await fetch(
      "http://stapi.co/api/v1/rest/character/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bodyParams),
      }
    );

    const data: CharactersResponse = await response.json();

    const items =
      data.characters?.map((char: Character) => {
        const infos = [
          char.gender && `Gender: ${char.gender}`,
          char.yearOfBirth && `Born: ${char.yearOfBirth}`,
          char.yearOfDeath && `Died: ${char.yearOfDeath}`,
          char.placeOfBirth && `From: ${char.placeOfBirth}`,
        ].filter(Boolean);

        return {
          id: char.uid,
          name: char.name,
          description:
            infos.length > 0
              ? infos.join(" | ")
              : "No detailed information available",
        };
      }) || [];
    return items;
  } catch (err) {
    console.error(err);
  }
};