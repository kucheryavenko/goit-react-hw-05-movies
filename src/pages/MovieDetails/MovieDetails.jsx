import { Suspense, useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MovieApiService } from 'services/movieApiService';
import { MovieInfo, Loader } from 'components';

const movieApiService = new MovieApiService();

const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setStatus('pending');
        const { data } = await movieApiService.fetchMovieById(movieId);

        if (data.length === 0) {
          toast.error('Ooops, someting went wrong. Please, try again.');
          setStatus('rejected');
          return;
        }
        setStatus('resolve');
        setDetails(data);
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    };

    getMovieById();
  }, [movieId]);

  return (
    <main>
      <Link to={location?.state?.from || '/'}>Go back</Link>
      {details !== null && (
        <MovieInfo details={details} location={location.state ?? '/'} />
      )}
      {status === 'pending' && <Loader />}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
