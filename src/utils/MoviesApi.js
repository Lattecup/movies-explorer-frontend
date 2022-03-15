class MoviesApi {
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

  getMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse);
  };
};

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  }
});