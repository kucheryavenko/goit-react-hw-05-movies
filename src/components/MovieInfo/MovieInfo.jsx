import { Link } from 'react-router-dom';

export const MovieInfo = ({ details, location }) => {
  const { poster_path, title, release_date, vote_average, overview, genres } =
    details;
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <>
      <img src={`${IMG_URL}${poster_path}`} alt={title} width="300" />
      <div>
        <h2>
          {title} ({release_date.slice(0, 4)})
        </h2>
        <p>Vote: {vote_average.toFixed(1)}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres.map(({ name }) => name).join(', ')}</p>
      </div>
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to="cast" state={location}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={location}>
            Reviews
          </Link>
        </li>
      </ul>
    </>
  );
};
