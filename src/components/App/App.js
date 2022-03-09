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

function App() {

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesMessage, setMoviesMessage] = React.useState("");
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

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

  function updateWindowSize() {
    setTimeout(() => {
      setScreenWidth(window.innerWidth);
    }, 1000);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  });

  React.useEffect(() => {
    getToken();
    setIsLoading(true);
    Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
      .then(([userInfo, savedMovies]) => {
        setCurrentUser(userInfo);
        if (localStorage.getItem('movies') === null) {
          localStorage.setItem('movies', JSON.stringify(savedMovies));
          setInitialMovies(savedMovies);
        } else {
          setInitialMovies(JSON.parse(localStorage.getItem('movies')));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleRegistration(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        handleAuthorization(email, password);
        setIsSuccess(true)
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
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      mainApi.checkToken(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/signin');
    setLoggedIn(false);
    localStorage.clear();
  };

  function handleChangeUserInfo(data) {
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

  function getSavedMovies() {
    mainApi.getUserMovies()
      .then((movies) => {
        setInitialSavedMovies(movies);
        movies.forEach((movie) => {
          const newSavedMovie = initialMovies.find((i) => i.id === movie.movieId);
          if (newSavedMovie !== undefined) {
            newSavedMovie.saved = true;
            setInitialMovies(initialMovies.map((i) => i.id === movie.movieId ? newSavedMovie : i))
          }
        })
      })
      .catch(() => {
        setInitialSavedMovies([]);
      });
  };

  function handleSearch(checked) {
    getSavedMovies();
    let sortedMovies;
    const keyword = localStorage.getItem('keyword') || '';
    const filteredMovies = location === '/movies' ? initialMovies : initialSavedMovies;

    if (keyword.length > 0) {
      sortedMovies = filteredMovies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
      sortedMovies.length === 0 && setMoviesMessage('Ничего не найдено');
      if (checked) {
        location === '/movies' ?
          setMovies(sortedMovies.filter((movie) => movie.duration <= 40)) :
          setSavedMovies(sortedMovies.filter((movie) => movie.duration <= 40));
      } else {
        location === '/movies' ?
          setMovies(sortedMovies) :
          setSavedMovies(sortedMovies);
      }
    } else {
      setMovies([]);
      setSavedMovies([]);
    };
  };

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(() => {
        getSavedMovies();
        const newSavedMovie = initialMovies.find((i) => i.id === movie.id);
        newSavedMovie.saved = true;
        setInitialMovies(initialMovies.map((i) => i.id === newSavedMovie.id ? newSavedMovie : i))
        localStorage.setItem('movies', JSON.stringify(initialMovies));
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
    const deletedMovie = initialSavedMovies.find((i) => i.movieId === movie.id);
    mainApi.deleteMovie(deletedMovie._id)
      .then(() => {
        getSavedMovies();
        const movieToDelete = initialMovies.find((i) => i === movie);
        delete movieToDelete.saved;
        setInitialMovies(initialMovies.map((i) => i.id === movieToDelete.id ? movieToDelete : i));
        localStorage.setItem('movies', JSON.stringify(initialMovies));
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

  function handleDeleteSavedMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        getSavedMovies();
        const newMovies = savedMovies.filter((i) => i !== movie);
        const movieToDelete = initialMovies.find((i) => i.id === movie.movieId);
        delete movieToDelete.saved;
        setSavedMovies(newMovies);
        setInitialMovies(initialMovies.map((i) => i.id === movieToDelete.id ? movieToDelete : i));
        localStorage.setItem("movies", JSON.stringify(initialMovies));
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
                  handleSearch={handleSearch}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  moviesMessage={moviesMessage}
                  isLoading={isLoading}
                  screenWidth={screenWidth}
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
                  savedMovies={savedMovies}
                  handleSearch={handleSearch}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteSavedMovie}
                  moviesMessage={moviesMessage}
                  isLoading={isLoading}
                  screenWidth={screenWidth}
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
