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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  function getAllData() {
    Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
     .then(([userInfo, savedMovies]) => {
       setCurrentUser(userInfo);
       setSavedMovies(savedMovies);
     })
     .catch((err) => {
       console.log(err);
     })
  };

  function handleRegistration(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleAuthorization(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        localStorage.getItem('token', res.token);
        setLoggedIn(true);
        navigate('/movies');
        getAllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken()
        .then(() => {
          setLoggedIn(true);
          getAllData();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/signin');
    setLoggedIn(false);
  };

  function handleChangeUserInfo(data) {
    mainApi.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  React.useEffect(() => {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegistration={handleRegistration} />} />
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization} />} />
          <Route 
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  movies={movies}
                  loggedIn={loggedIn}
                />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  loggedIn={loggedIn}
                  movies={movies}
                />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/profile'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  loggedIn={loggedIn}
                  onSignOut={handleSignOut}
                  onChangeProfile={handleChangeUserInfo}
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
