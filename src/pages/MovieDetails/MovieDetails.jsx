import { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { MovieApiService } from 'services/movieApiService';
import { MovieInfo } from 'components';

const movieApiService = new MovieApiService();

export const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

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
      <button type="button">Go back</button>
      {status === 'resolve' && <MovieInfo details={details} />}
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};
