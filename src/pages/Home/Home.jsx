import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ListMovies, Loader } from 'components';
import { MovieApiService } from 'services/movieApiService';

const movieApiService = new MovieApiService();

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const getTrendingMovie = async () => {
      try {
        setStatus('pending');

        const { data } = await movieApiService.fetchTrendingMovie();

        if (data.length === 0) {
          toast.error('Ooops, someting went wrong. Please, try again.');
          setStatus('rejected');
          return;
        }

        setStatus('resolved');
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    };

    getTrendingMovie();
  }, []);

  if (trendingMovies === null) {
    return;
  }

  return (
    <main>
      <h1>Trending today</h1>
      {trendingMovies.length > 0 && (
        <ListMovies movies={trendingMovies} path={'movies/'} />
      )}
      {status === 'pending' && <Loader />}
    </main>
  );
};

export default Home;
