import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieApiService } from 'services/movieApiService';
import { Thumb, Img } from 'components';

const movieApiService = new MovieApiService();

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const STATIC_IMG = 'https://static.hdrezka.ac/i/nopersonphoto.png';

  useEffect(() => {
    const getCast = async () => {
      try {
        const { data } = await movieApiService.fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map(({ id, name, profile_path, character }) => {
        return (
          <li key={id}>
            <Thumb>
              <Img
                src={profile_path ? `${IMG_URL}${profile_path}` : STATIC_IMG}
                alt={name}
              />
            </Thumb>
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
