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

  register(data) {
    return fetch(`${this._url}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: data.name,
        email: data.email, 
        password: data.password
      })
    })
    .then(this._handleResponse);
  };

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: data.email,
        password: data.password
      })
    })
    .then(this._handleResponse);
  };

  checkToken = () => {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(this._handleResponse);
  };

};

export const mainApi = new MainApi({
  url: 'https://movies-explorer.nomoredomains.xyz',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
});