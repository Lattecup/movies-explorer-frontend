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
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  function setAllData() {
    Promise.all([mainApi.getUserInfo(), moviesApi.getMovies(), mainApi.getMovies()])
      .then(([userInfo, initialMovies, savedMovies]) => {
        setCurrentUser(userInfo);
        setMovies(initialMovies);
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleRegistration(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          handleAuthorization(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleAuthorization(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setAllData();
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function getUserInfo() {
    const token = localStorage.getItem('jwt');
    mainApi.getUserInfo(token)
      .then((data) => {
        if (data) {
          setCurrentUser(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setAllData();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);


  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate('/');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/signup" element={<Register onRegistration={handleRegistration} />} />
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization} />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies loggedIn={loggedIn} movies={movies} />} />
          <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} movies={movies} />} />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} onSignOut={handleSignOut}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
