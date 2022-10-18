import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ContainerInfo,
  ImgInfo,
  TitleDesc,
  VoteInfo,
  AdditionalList,
} from 'components';

export const MovieInfo = ({ details, location }) => {
  const { poster_path, title, release_date, vote_average, overview, genres } =
    details;
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <>
      <ContainerInfo>
        <ImgInfo src={`${IMG_URL}${poster_path}`} alt={title} width="300" />

        <div>
          <h2>
            {title} ({release_date.slice(0, 4)})
          </h2>
          <VoteInfo>Vote: {vote_average.toFixed(1)}</VoteInfo>
          <TitleDesc>Overview</TitleDesc>
          <p>{overview}</p>
          <TitleDesc>Genres</TitleDesc>
          <p>{genres.map(({ name }) => name).join(', ')}</p>
        </div>
      </ContainerInfo>
      <h2>Additional information</h2>
      <AdditionalList>
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
      </AdditionalList>
    </>
  );
};

MovieInfo.propTypes = {
  details: PropTypes.object.isRequired,
};
