export type Item = {
  id: string;
  name: string;
  description: string;
};

export type RequestParams = {
  pageNumber: string;
  pageSize: string;
  name?: string;
};

export type Character = {
  uid: string;
  name: string;
  gender?: string;
  yearOfBirth?: number;
  yearOfDeath?: number;
  placeOfBirth?: string;
};

export type CharactersResponse = {
  characters?: Character[];
};

export type Props = {
  onSearch: (value: string) => void;
};
