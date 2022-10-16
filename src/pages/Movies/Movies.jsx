import { useState, useEffect } from 'react';
import { Searchbar, ListMovies } from 'components';
import { MovieApiService } from 'services/movieApiService';

const movieApiService = new MovieApiService();

export const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getSearchMovie = async () => {
      if (!searchQuery) {
        return;
      }
      try {
        const { data } = await movieApiService.fetchSearchMovie(searchQuery);
        setSearchMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchMovie();
  }, [searchMovies, searchQuery]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setSearchMovies([]);
  };

  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />
      {searchMovies !== [] && <ListMovies movies={searchMovies} />}
    </main>
  );
};
