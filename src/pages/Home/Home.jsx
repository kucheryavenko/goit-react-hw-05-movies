import { useState, useEffect } from 'react';
import { ListMovies } from 'components';
import { MovieApiService } from 'services/movieApiService';

const movieApiService = new MovieApiService();

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovie = async () => {
      try {
        const { data } = await movieApiService.fetchTrendingMovie();
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getTrendingMovie();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <ListMovies movies={trendingMovies} path={'movies/'} />
    </main>
  );
};
