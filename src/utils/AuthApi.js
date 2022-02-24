export const BASE_URL = 'https://api.movies-explorer.nomoredomains.xyz';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  };

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      name: data.name,
      email: data.email,
      password: data.password })
  })
  .then(handleResponse);
};

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
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
  .then(handleResponse);
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse);
};