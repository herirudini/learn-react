// shared/services/SharedService.ts
import { OMDB_S } from '../interfaces/CommonInterface';
import { Movie, MovieDetail } from '../interfaces/MovieModel';
import { LocalEnv } from '../../env/localenv';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useMovies(search: string = 'indonesia', year: string = '', page: string = '', _: string = '') {
  return useQuery({
    queryKey: [search, year, page], // if the search:string value changed then the http request will happen because we put search in the array, the etc:string changes will not cause anything
    queryFn: () =>
      axios
        .get<OMDB_S<Movie>>(`https://www.omdbapi.com/?apikey=${LocalEnv.OMDB_API_KEY}&s=${search}&page=${page}&y=${year}`)
        .then(
          (res) => {
            return res
          },
          (err) => {
            console.error('Error fetching movies:', err);
            throw err;
          }
        ),
  });
}

export async function fetchMovies(query: string = 'indonesia', year: string = '', page: string = ''): Promise<OMDB_S<Movie>> {
  const apiUrl = `https://www.omdbapi.com/?apikey=${LocalEnv.OMDB_API_KEY}&s=${query}&page=${page}&y=${year}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: OMDB_S<Movie> = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function fetchMovieDetail(imdbID: string = 'indonesia', plot: string = 'full'): Promise<MovieDetail> {
  const apiUrl = `https://www.omdbapi.com/?apikey=${LocalEnv.OMDB_API_KEY}&i=${imdbID}&plot=${plot}&r=json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: MovieDetail = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
