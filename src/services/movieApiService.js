import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export class MovieApiService {
  #KEY_API = '28d4f8ff1e1282fe32fa07ec61034261';
  #MEDIA_TYPE = 'movie';
  #TIME_WINDOW = 'day';

  async fetchTrendingMovie() {
    const response = await axios.get(
      `trending/${this.#MEDIA_TYPE}/${this.#TIME_WINDOW}`,
      {
        params: {
          api_key: this.#KEY_API,
        },
      }
    );

    return response;
  }

  async fetchSearchMovie(searchQuery) {
    this.query = searchQuery;
    const response = await axios.get(`search/movie`, {
      params: {
        api_key: this.#KEY_API,
        query: this.query,
      },
    });

    return response;
  }

  async fetchMovieById(movieId) {
    const ID = Number(movieId);
    const response = await axios.get(`movie/${ID}`, {
      params: {
        api_key: this.#KEY_API,
      },
    });

    return response;
  }

  async fetchCast(id) {
    const response = await axios.get(`movie/${id}/credits`, {
      params: {
        api_key: this.#KEY_API,
      },
    });

    return response;
  }

  async fetchReviews(id) {
    const response = await axios.get(`movie/${id}/reviews`, {
      params: {
        api_key: this.#KEY_API,
      },
    });

    return response;
  }
}
