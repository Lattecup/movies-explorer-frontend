import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  function handleChangeName(evt) {
    setName(evt.target.value);
    setErrorName(evt.target.validationMessage);
    setIsValid(evt.target.closest(".profile__info").checkValidity());
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    setErrorEmail(evt.target.validationMessage);
    setIsValid(evt.target.closest(".profile__info-data").checkValidity());
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onChangeProfile(name, email);
  };

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <div className="profile__info">
              <label className="profile__label profile__label_type_title">
                Имя
                <input className="profile__input" name="name" maxLength="30" minLength="2" type="text" required placeholder={name} error={errorName} isValid={isValid} onChange={handleChangeName}/>
              </label>
            </div>
          <div className="profile__info-data">
            <label className="profile__label profile__label_type_title">
              E-mail
              <input className="profile__input" name="email" type="email" required placeholder={email} error={errorEmail} isValid={isValid} onChange={handleChangeEmail} patter="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/>
            </label>
          </div>
        </div>
        <div className="profile__buttons">
          <button type="submit" className="profile__button profile__button_type_submit link" onSubmit={handleSubmit}>Редактировать</button>
          <button type="button" className="profile__button profile__button_type_logout link" aria-label="Выйти из аккаунта" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
};

export default Profile;