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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }) 
  .then(handleResponse);
};

export const getUserInfo = () => {
  return fetch('https://api.movies-explorer.nomoredomains.xyz/users/me', {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse);
};

export const setUserInfo = (data) => {
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

export const getUserMovies = () => {
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
      duration: movie.director,
      year: movie.year,
      description: movie.description,
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
  })
  .then(handleResponse);
};

export const deleteMovie = (movieId) => {
  return fetch(`https://api.movies-explorer.nomoredomains.xyz/movies/${movieId}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
     },
  })
  .then(handleResponse);
};