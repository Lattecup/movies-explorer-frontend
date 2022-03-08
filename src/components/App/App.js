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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(true);

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  function setAllData() {
    Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
      .then(([userInfo, savedMovies]) => {
        setCurrentUser(userInfo);
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleRegistration(name, email, password) {
    mainApi.register(name, email, password)
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
    mainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
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
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken()
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

  React.useEffect(() => {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/');
    setLoggedIn(false);
  };

  function handleChangeProfile(data) {
    const token = localStorage.getItem('token');
    mainApi.setUserInfo(data, token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegistration={handleRegistration} />} />
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization} />} />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                movies={movies}
              />
            </ProtectedRoute>
            }
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                movies={movies}
              />
            </ProtectedRoute>
            }
          />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                onSignOut={handleSignOut}
                onChangeProfile={handleChangeProfile}
              />
            </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
