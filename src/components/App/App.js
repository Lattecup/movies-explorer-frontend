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
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(true);

  function handleRegistration(data) {
    mainApi.register(data)
    .then(() => {
      setIsSuccess(true);
      setSuccessMessage('Вы успешно зарегистрированы!')
      navigate('/movies');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
    })
    .finally(() => {
      setErrorMessage('Что-то пошло не так...');
    });
  };

  function handleAuthorization(data) {
    mainApi.authorize(data)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      navigate('/movies');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken()
      .then((res) => {
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
    };
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn}/>} />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Register isSuccess={isSuccess} successMessage={successMessage} errorMessage={errorMessage} onRegistartion={handleRegistration}/>} />
          <Route path="/signin" element={<Login onAuthorization={handleAuthorization} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
