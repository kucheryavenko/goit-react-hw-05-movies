import { Link } from 'react-router-dom';

export const ListMovies = ({ movies, path = '' }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`${path}${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};
