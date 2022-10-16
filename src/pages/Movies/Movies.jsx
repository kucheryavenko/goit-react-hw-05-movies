import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Searchbar, ListMovies } from 'components';
import { MovieApiService } from 'services/movieApiService';

const movieApiService = new MovieApiService();

export const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    const getSearchMovie = async () => {
      if (!query) {
        return;
      }
      try {
        const { data } = await movieApiService.fetchSearchMovie(query);
        setSearchMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchMovie();
  }, [searchMovies, query]);

  const handleFormSubmit = searchQuery => {
    setSearchParams(searchQuery !== '' ? { query: searchQuery } : {});
    setSearchMovies([]);
  };

  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />
      {searchMovies !== [] && <ListMovies movies={searchMovies} />}
    </main>
  );
};
