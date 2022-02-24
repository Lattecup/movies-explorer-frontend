import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  return (
    <>
      {props.loggedIn ? (
        <header className="header">
          <Navigation />
        </header>
      ) : (
        <header className="header">
          <div className="header__content">
            <Logo />
            <div className="header__links">
              <Link to='/signup' className="header__link link">Регистрация</Link>
              <Link to='/signin' className="header__link header__link_type_blue link">Войти</Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;