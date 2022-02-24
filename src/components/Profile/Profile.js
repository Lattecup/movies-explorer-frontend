import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
  const [name, setName] = React.useState("Анастасия");
  const [email, setEmail] = React.useState("email@yandex.ru");

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Анастасия!</h2>
            <div className="profile__info">
              <label className="profile__label profile__label_type_title">
                Имя
                <input className="profile__input" name="name" maxLength="30" minLength="2" type="text" required placeholder={name}/>
              </label>
            </div>
          <div className="profile__info-data">
            <label className="profile__label profile__label_type_title">
              E-mail
              <input className="profile__input" name="email" type="email" required placeholder={email}/>
            </label>
          </div>
        </div>
        <div className="profile__buttons">
          <button type="submit" className="profile__button profile__button_type_submit link">Редактировать</button>
          <button type="button" className="profile__button profile__button_type_logout link" aria-label="Выйти из аккаунта" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
};

export default Profile;