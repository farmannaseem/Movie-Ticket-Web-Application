import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FiUser } from 'react-icons/fi';
import { movies } from '../data/movies';
import { Movie } from '../types/types';
import Header from './Header';
import {
  BookingContainer,
  Header as BookingHeader,
  MovieGrid,
  MovieCard,
  UserSection,
} from './styles/Booking.styles';

export default function Booking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { setSelectedMovie } = useApp();

  useEffect(() => {
    const loadMovies = async () => {
      const movieService = movies();
      const fetchedMovies = await movieService.fetchMovies();
      setMovieList(fetchedMovies);
    };

    loadMovies();
  }, []);

  const filteredMovies = movieList.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    navigate('/selection');
  };

  return (
    <BookingContainer className="px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <UserSection className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-xl">
            <FiUser />
          </div>
          <span className="text-base font-medium">Farman Naseem</span>
        </UserSection>
      </div>

      <BookingHeader>
        <h1 className="text-xl sm:text-2xl font-semibold text-black italic">
          Good Morning Farman Naseem
        </h1>
      </BookingHeader>

      <MovieGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            onClick={() => handleMovieSelect(movie)}
            className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="image-container">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="content p-2">
              <h3 className="text-sm font-semibold truncate">{movie.name}</h3>
              <span className="year text-xs text-gray-500">{movie.year}</span>
            </div>
          </MovieCard>
        ))}
      </MovieGrid>
    </BookingContainer>
  );
}
