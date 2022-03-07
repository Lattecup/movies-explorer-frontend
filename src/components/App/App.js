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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/AuthApi';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);
  const [moviesMessage, setMoviesMessage] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  function handleRegistration(name, email, password) {
    auth.register(name, email, password)
    .then(() => {
      handleAuthorization(email, password);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleAuthorization(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      navigate('/movies');
      getAllData();
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
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
    };
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
    setLoggedIn(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((movies) => {
        if (localStorage.getItem('movies') === null) {
          localStorage.setItem('movies', JSON.stringify(movies));
          setInitialMovies(movies);
        } else {
          setInitialMovies(JSON.parse(localStorage.getItem('movies')));
        }
      })
      .catch((err) => {
        setMoviesMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleSearch(checked) {
    let sortedMovies;
    const keyword = localStorage.getItem('keyword') || '';
    const filteredMovies = location === '/movies' ? initialMovies : initialSavedMovies;

    if (keyword.length > 0) {
      sortedMovies = filteredMovies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
      sortedMovies.length === 0 && setMoviesMessage('Ничего не найдено');
      if (checked) {
        location === '/movies' ?
        setMovies(sortedMovies.filter(movie => movie.duration <= 40)) :
        setSavedMovies(sortedMovies.filter(movie => movie.duration <= 40));
      } else {
        location === '/movies' ?
        setMovies(sortedMovies) :
        setSavedMovies(sortedMovies);
      }
    } else {
      setMovies([]);
      setSavedMovies([]);
      setMoviesMessage('Нужно ввести ключевое слово')
    }
  };
  
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function getAllData() {
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
      .then(([userInfo, moviesData]) => {
        setCurrentUser(userInfo);
        if (localStorage.getItem('movies') === null) {
          setInitialMovies(moviesData);
          localStorage.setItem('movies', JSON.stringify(moviesData));          
        } else {
          setInitialMovies(JSON.parse(localStorage.getItem('movies')));
        }
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
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization}  onSignOut={handleSignOut} />} />
          <Route path="/movies" element={
            <Movies
              loggedIn={loggedIn} 
              movies={movies} 
              moviesMessage={moviesMessage}
              isLoading={isLoading} 
              handleSearch={handleSearch}
              handleSaveMovie={handleSaveMovie}
            />} 
          />
          <Route path="/saved-movies" element={
            <SavedMovies
              loggedIn={loggedIn}  
              savedMovies={savedMovies}
              moviesMessage={moviesMessage}
              isLoading={isLoading}
              handleSearch={handleSearch}
            />} 
          />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
