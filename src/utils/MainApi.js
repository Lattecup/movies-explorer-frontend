function handleResponse(res) {
  if (res.ok) {
    return res.json();
  };

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (name, email, password) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/signup', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(handleResponse);
};

export const authorize = (email, password) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/signin', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then(handleResponse);
};

export const signOut = () => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/signout', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }) 
  .then(handleResponse);
};

export const checkToken = (token) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/users/me', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse);
};

export const getUserInfo = (token) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/users/me', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse);
};

export const setUserInfo = (data, token) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/users/me', {
    credentials: 'include',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    })
  })
  .then(handleResponse);
};

export const getUserMovies = (token) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/movies', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse);
};

export const saveMovie = (movie) => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/movies', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
  })
  .then(handleResponse);
};

export const deleteMovie = (id) => {
  return fetch(`https://api.movies-explorer.nomoredomains.xyz/movies/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
     },
  })
  .then(handleResponse);
};