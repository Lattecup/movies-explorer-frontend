import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/account-image.svg';
import Logo from '../Logo/Logo';
import MenuMobile from '../MenuMobile/MenuMobile';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleMenu() {
    setIsMenuOpen(isMenuOpen ? false : true);
  };


  return (
    <nav className="navigation">
      <div className="navigation__content">
        <Logo />
        <NavLink to="/movies" className={({ isActive }) => "link navigation__link" + (isActive ? "_active" : "")}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={({ isActive }) => "link navigation__link" + (isActive ? "_active" : "")}>Сохраненные фильмы</NavLink>
      </div>
      <div className="navigation__account-container">
        <Link to="/profile" className="navigation__account-link link">Аккаунт</Link>
        <div className="navigation__account-image-container">
          <img src={account} alt="Аккаунт" className="navigation__account-image" />
        </div>
      </div>
      <MenuMobile isOpen={isMenuOpen} onClose={toggleMenu} onOpen={toggleMenu} />
    </nav>
  );
};

export default Navigation;