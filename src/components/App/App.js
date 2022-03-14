import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import Header from '../Header/Header';

function App() {

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState(false);
  const [shortSavedMovies, setShortSavedMovies] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const isNeedHeader = location === '/' || location === '/movies' || location === '/saved-movies' || location === '/profile';

  const keyword = localStorage.getItem('keyword');
  const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialSavedMovies = JSON.parse(localStorage.getItem('initialSavedMovies'));
  const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));


  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  };

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') 
        closeAllPopups();
      };
      document.addEventListener('keydown', handleEscClose);
      return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  function getAlldata() {
    Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies(), moviesApi.getMovies()])
      .then(([userInfo, addedMovies, initialMovies]) => {
        setCurrentUser(userInfo);
        setMoviesList(initialMovies);
        setSavedMoviesList(addedMovies);
        localStorage.setItem('initialMovies', JSON.stringify(initialMovies));
        localStorage.setItem('initialSavedMovies', JSON.stringify(addedMovies));
        localStorage.setItem('allMovies', JSON.stringify(initialMovies));
        localStorage.setItem('savedMovies', JSON.stringify(addedMovies));
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
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  function handleAuthorization(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          getAlldata();
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((userInfo) => {
            if (userInfo) {
              setCurrentUser(userInfo);
              setLoggedIn(true);
            };
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  function handleSignOut() {
    mainApi.signOut().catch((err) => err);
    localStorage.removeItem('token');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('initialSavedMovies');
    localStorage.removeItem('checkboxStatus');
    localStorage.removeItem('keyword');
    localStorage.removeItem('checkboxStatusSaved');
    setSavedMoviesList([]);
    setMoviesList([]);
    setCurrentUser([]);
    setLoggedIn(false);
    navigate('/');
  };

  function handleChangeUserInfo(data) {
    const token = localStorage.getItem('token');
    mainApi.setUserInfo(data, token)
      .then((data) => {
        setCurrentUser(data);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  React.useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if (!allMovies) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          localStorage.setItem('initialMovies', JSON.stringify(data));
          setIsLoading(false);
          setMoviesList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMoviesList(allMovies);
    }
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (!savedMovies && loggedIn) {
      setIsLoading(true);
      mainApi.getUserMovies()
        .then((data) => {
          localStorage.getItem('savedMovies', JSON.stringify(data));
          localStorage.getItem('initialSavedMovies', JSON.stringify(data));
          setSavedMoviesList(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSavedMoviesList(savedMovies);
    }
  }, []);

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((data) => {
        setSavedMoviesList([...savedMoviesList, data]);
        localStorage.setItem('savedMovies', JSON.stringify([...savedMoviesList, data]));
        localStorage.setItem('initialSavedMovies', JSON.stringify([...savedMoviesList, data]));
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  function handleDeleteMovie(movie) {
    const id = movie.movieId || movie.id;
    const movieId = movie._id || savedMoviesList.find((i) => i.movieId === movie.id)._id;
    mainApi.deleteMovie(movieId)
      .then(() => {
        const movies = savedMoviesList.filter((i) => i.movieId !== id);
        setSavedMoviesList(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        localStorage.setItem('initialSavedMovies', JSON.stringify(movies));
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  function handleSearch(data, keyword, mount) {
    if (keyword && location === '/movies') {
      const regExp = new RegExp(keyword, 'gi');
      const filteredMovies = allMovies.filter((movie) => regExp.test(movie.nameRU) || regExp.test(movie.nameEN));
      setMoviesList(filteredMovies);
    } else if (!keyword && location === '/movies') {
        setMoviesList(initialMovies);
    } else if (keyword && location === '/saved-movies') {
        const regExp = new RegExp(keyword, 'gi');
        const filteredMovies = savedMovies.filter((movie) => regExp.test(movie.nameRU) || regExp.test(movie.nameEN));
        setSavedMoviesList(filteredMovies);
    } else if (!keyword && location === '/saved-movies') {
        setSavedMoviesList(initialSavedMovies);
    }
  };

  function handleShortMovies() {
    if (location === '/movies' && shortMovies === false) {
      localStorage.setItem('checkboxStatus', true);
      setShortMovies(true);
    } else if (location === '/movies' && shortMovies === true) {
      localStorage.setItem('checkboxStatus', false);
      setShortMovies(false);
    } else if (location === '/saved-movies' && shortSavedMovies === false) {
      localStorage.setItem('checkboxStatusSaved', true);
      setShortSavedMovies(true);
    } else if (location === '/saved-movies' && shortSavedMovies === true) {
      localStorage.setItem('checkboxStatusSaved', false);
      setShortSavedMovies(false);
    }
  };

  React.useEffect(() => {
    location === '/movies' && handleSearch(allMovies, keyword, checkboxStatus);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isNeedHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegistration={handleRegistration} />} />
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization} />} />
          <Route 
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  moviesList={moviesList}
                  savedMoviesList={savedMoviesList}
                  handleSearch={handleSearch}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  isLoading={isLoading}
                  checkboxStatus={JSON.parse(
                    localStorage.getItem('checkboxStatus')
                  )}
                  handleShortMovies={handleShortMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  savedMoviesList={savedMoviesList}
                  handleSearch={handleSearch}
                  handleDeleteMovie={handleDeleteMovie}
                  isLoading={isLoading}
                  checkboxStatus={shortSavedMovies}
                  handleShortMovies={handleShortMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/profile'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  onSignOut={handleSignOut}
                  onChangeProfile={handleChangeUserInfo}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onState={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;