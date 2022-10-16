import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { MovieApiService } from 'services/movieApiService';
import { MovieInfo } from 'components';

const movieApiService = new MovieApiService();

export const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setStatus('pending');
        const { data } = await movieApiService.fetchMovieById(movieId);
        if (!data) {
          return console.log('No data!');
        }
        setDetails(data);
        setStatus('resolve');
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    };

    getMovieById();
  }, [movieId]);

  return (
    <main>
      <Link to={location.state.from}>Go back</Link>
      {details !== {} && status === 'resolve' && (
        <MovieInfo details={details} location={location.state} />
      )}
      <Outlet />
    </main>
  );
};
