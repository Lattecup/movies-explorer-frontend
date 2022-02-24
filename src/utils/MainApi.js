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

  getMovies() {
    return fetch(this._url + '/movies', {
      credentials: 'include',
      method: 'GET',
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