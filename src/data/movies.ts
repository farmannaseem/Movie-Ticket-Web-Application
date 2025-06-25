import { Movie } from '../types/types';

const API_KEY = 'c1b461f5a2688c2ad42bd38343069c74';
const BASE_URL = 'https://api.themoviedb.org/3';

export const movies = () => {
  return {
    fetchMovies: async (): Promise<Movie[]> => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();

        return data.results.map((movie: any) => ({
          id: movie.id,
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: movie.release_date?.split('-')[0] || 'N/A',
        }));
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        return [];
      }
    },
  };
};
