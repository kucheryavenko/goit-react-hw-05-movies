import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Searchbar, ListMovies, Loader } from 'components';
import { MovieApiService } from 'services/movieApiService';

const movieApiService = new MovieApiService();

export const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState('idle');
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    const getSearchMovie = async () => {
      if (!query) {
        return;
      }
      try {
        setStatus('pending');

        const { data } = await movieApiService.fetchSearchMovie(query);

        if (data.length === 0) {
          toast.error('Ooops, someting went wrong. Please, try again.');
          setStatus('rejected');
          return;
        }

        setSearchMovies(data.results);
        setStatus('resolved');
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    };

    getSearchMovie();
  }, [query]);

  const handleFormSubmit = searchQuery => {
    setSearchParams(searchQuery !== '' ? { query: searchQuery } : {});
    setSearchMovies([]);
  };

  if (searchMovies === null) {
    return;
  }
  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />
      {searchMovies !== [] && <ListMovies movies={searchMovies} />}
      {status === 'pending' && <Loader />}
    </main>
  );
};
