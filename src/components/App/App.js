import React from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/AuthApi';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(true);

  const [movies, setMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  function handleRegistration(name, email, password) {
    auth.register(name, email, password)
      .then(() => {
        handleAuthorization(email, password);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleAuthorization(email, password) {
    auth.authorize(email, password)
     .then((res) => {
       localStorage.setItem('jwt', res.token);
       setLoggedIn(true);
       navigate('/movies');
     })
     .catch((err) => {
       console.log(err);
     })
  };

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          })
          .catch((err) => {
            console.log(err);
          })
    };
  };

  React.useEffect(() => {
    checkToken();
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/signup" element={<Register onRegistration={handleRegistration} />} />
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization} />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies loggedIn={loggedIn} movies={movies} />} />
          <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn}/>} />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
