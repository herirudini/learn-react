export interface IObjectItemPick {
  [key: string]: any;
}

export interface OMDB_S<T> {
  Response: 'True'|'False';
  Search: T[];
  totalResults: number;
}

