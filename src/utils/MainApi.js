class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  };

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    };

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse);
  };

  setUserInfo(data) {
    return fetch(this.url + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    .then(this._handleResponse);
  };

  getMovies() {
    return fetch(this._url + '/movies', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers, 
    })
    .then(this._handleResponse);
  };

  saveMovie(movie) {
    return fetch(this.url + '/movies', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.director,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })
    .then(this._handleResponse);
  };

  removeMovie(movieId) {
    return fetch(this.url + `/movies/${movieId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  };
};

export const mainApi = new MainApi({
  url: 'https://api.movies-explorer.nomoredomains.xyz',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
});